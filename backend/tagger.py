from pathlib import Path
import sqlite3
from collections import namedtuple
import requests
import json

import numpy as np

from secrets.config import config

Article = namedtuple('Article',
                     ['article_id', 'source_id', 'headline', 'excerpt', 'full_text', 'image_url', 'article_url'])

path_data = Path('sql')
path_data.mkdir(exist_ok=True)
db_file = path_data / 'db.sqlite'
with sqlite3.connect(str(db_file)) as con:
    cur = con.cursor()
    cur.execute('SELECT article_id, source_id, headline, excerpt, full_text, image_url, article_url FROM article')
    articles = cur.fetchall()
    articles = [Article(*a) for a in articles]
articles = [a for a in articles if len(a.full_text) > 1]
print(len(articles))
print(articles[0].headline)


def get_response(url: str, token, text) -> str:
    headers = {'X-AG-Access-Token': token, 'Content-Type': 'text/raw', 'outputformat': 'application/json'}
    try:
        response = requests.post(url, data=text, headers=headers)
        if response.ok:
            return response
        else:
            raise Exception('invalid response code', response)
    except Exception as e:
        raise e


token = config['tagger_token']


def get_dict(token, a):
    response = get_response('https://api.thomsonreuters.com/permid/calais', token,
                            a)
    content = response.text.encode('utf-8')
    return json.loads(content)


tags = [get_dict(token, a.full_text.encode('utf-8'))
        for a in articles]
tags[0]


def get_relevant(tag):
    keys = tag.keys()
    keys = [k for k in keys if k.startswith('http')]

    filtered = [tag[k]
                for k in keys
                if 'relevance' in tag[k] and 'name' in tag[k]]
    return [(f['name'], f['relevance']) for f in filtered]


cleaned = [get_relevant(t) for t in tags]
cleaned[0]

cleaned = [(a.article_id, t) for a, t in zip(articles, cleaned)]
cleaned[0]

cleaned = [(a, [x for x in t if x[1] > 0.5])
           for a, t in cleaned]
cleaned = [(a, t) for a, t in cleaned if len(t) > 0]
cleaned[0]


def calc_similarity(d1, d2):
    k1, v1 = list(zip(*d1))
    k2, v2 = list(zip(*d2))

    max_sim = len(set(k1 + k2))
    shared_keys = set(k1).intersection(k2)
    if len(shared_keys) == 0:
        return 0

    x = [(v1[k1.index(sk)] - v2[k2.index(sk)]) for sk in shared_keys]
    x = np.abs(x)
    x = [1 - y for y in x]
    x = sum(x)
    return x / max_sim


# calc_similarity(cleaned[0][1], cleaned[1][1])

sims = [(a1[0], a2[0], calc_similarity(a1[1], a2[1]))
        for a1 in cleaned
        for a2 in cleaned
        if a1[0] > a2[0]]
sims[:20]


def clear_table(cur):
    cur.execute(f'UPDATE similarities SET permid = 0')


def update_db(cur, id_1, id_2, value):
    cur.execute(f'UPDATE similarities SET permid = ? WHERE article_id_1 = ? AND article_id_2 = ?',
                (value, id_1, id_2))


with sqlite3.connect(str(db_file)) as con:
    cur = con.cursor()

    clear_table(cur)
    con.commit()

    [update_db(cur, id_1, id_2, value)
     for id_1, id_2, value in sims
     if id_1 > id_2]
    con.commit()
