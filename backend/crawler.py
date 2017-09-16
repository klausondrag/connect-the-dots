import sqlite3
from pathlib import Path
from collections import namedtuple

import requests
from bs4 import BeautifulSoup

from secrets.config import config


def create_tables(db_file, sql_file):
    with sqlite3.connect(str(db_file)) as con:
        with open(sql_file, 'r') as f:
            script = f.read()
        con.executescript(script)
        con.commit()
        cur = con.cursor()
        cur.execute('SELECT count(*) FROM article')
        print(cur.fetchone()[0])


def get_response(url: str) -> str:
    try:
        response = requests.get(url)
        if response.ok:
            return response
        else:
            raise Exception('invalid response code', response)
    except Exception as e:
        raise e


def get_articles(name, config, get_text):
    api_key = config['newsApiKey']
    url = 'https://newsapi.org/v1/articles?source={name}&sortBy=top&apiKey={api_key}'
    article = namedtuple('article', ['headline', 'excerpt', 'full_text', 'image_url', 'article_url'])

    url = url.format(name=name, api_key=api_key)

    response = get_response(url)

    j = response.json()
    articles = j['articles']
    print('Articles found: {}'.format(len(j['articles'])))
    print('First article: {}'.format(articles[0]))

    article_tuples = [article(a['title'], a['description'], '', a['urlToImage'], a['url']) for a in articles]

    # for each article get the text and add it to the array
    article_tuples_full = [article(t.headline, t.excerpt, get_text(get_soup(t.article_url)),
                                   t.image_url, t.article_url)
                           for t in article_tuples]
    print('\nFirst parsed article headline: {}'.format(article_tuples_full[0].headline))
    return article_tuples_full


def get_soup(url):
    print('.', end='')
    response = get_response(url)
    data = response.content.decode('utf-8')
    soup = BeautifulSoup(data, 'lxml')
    return soup


def get_text_generic(soup, element, prop, child, is_recursive=True) -> str:
    body = soup.find(element, prop)
    if body is not None:
        text = body.find_all(child, recursive=is_recursive)
        text = [t.text for t in text]
        return '\n'.join(text)
    else:
        return ''


def get_text_daily_mail(soup) -> str:
    return get_text_generic(soup, 'div', {'itemprop': 'articleBody'}, 'p', False)


def get_text_reuters(soup) -> str:
    return get_text_generic(soup, 'div', {'class': 'ArticleBody_body_2ECha'}, 'p')


def get_text_the_guardian_uk(soup) -> str:
    return get_text_generic(soup, 'div', {'itemprop': 'articleBody'}, 'p')


def get_text_independent(soup) -> str:
    return get_text_generic(soup, 'div', {'itemprop': 'articleBody'}, 'p', False)


def print_db_stats(cur):
    cur.execute("SELECT count(*) FROM company")
    print('Companies in db: {}'.format(cur.fetchone()[0]))
    cur.execute("SELECT count(*) FROM article")
    print('Articles in db: {}'.format(cur.fetchone()[0]))


def insert_in_db(name, articles, db_file):
    with sqlite3.connect(str(db_file)) as con:
        cur = con.cursor()

        print_db_stats(cur)
        company_id = _get_company_id(con, cur, name)

        print_db_stats(cur)
        articles = _filter_articles(articles, cur)
        [_insert_article(cur, a, company_id) for a in articles]
        con.commit()

        print_db_stats(cur)


def _insert_article(cur, a, company_id):
    cur.execute(('INSERT INTO article (source_id, headline, excerpt, image_url, article_url, full_text)' +
                 'VALUES (?, ?, ?, ?, ?, ?)'),
                (company_id, a.headline, a.excerpt, a.image_url, a.article_url, a.full_text))


def _filter_articles(articles, cur):
    cur.execute('SELECT article_url FROM article')
    existing_urls = cur.fetchall()
    existing_urls = [eu[0] for eu in existing_urls]
    articles = [a for a in articles if a.article_url not in existing_urls]
    return articles


def _get_company_id(con, cur, name):
    cur.execute(f'SELECT source_id FROM company WHERE name = ?', (name,))
    company_id = cur.fetchone()
    if company_id is None or len(company_id) == 0:
        cur.execute(f'INSERT INTO company (name) VALUES (?)', (name,))
        cur.execute(f'SELECT source_id FROM company WHERE name = ?', (name,))
        company_id = cur.fetchone()
        if company_id and len(company_id) > 0:
            company_id = company_id[0]
        else:
            raise Exception('?')
        con.commit()
    return company_id


def crawl_newspaper(name, config, db_file, get_text):
    print('Handling {}...'.format(name))
    articles = get_articles(name, config, get_text)
    insert_in_db(name, articles, db_file)


def main():
    path_data = Path('sql')
    path_data.mkdir(exist_ok=True)
    db_file = path_data / 'db.sqlite'
    sql_file = path_data / 'create_tables.sql'

    # create_tables(db_file, sql_file)
    newspapers = [('daily-mail', get_text_daily_mail),
                  ('the-guardian-uk', get_text_the_guardian_uk),
                  ('reuters', get_text_reuters),
                  ('independent', get_text_independent)]
    [crawl_newspaper(n, config, db_file, m) for n, m in newspapers]
    print('Done')


if __name__ == '__main__':
    main()
