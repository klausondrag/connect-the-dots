from pathlib import Path
import sqlite3
from collections import namedtuple

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

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
    print(articles[0])

articles_contents = [a.full_text for a in articles]
tfidf = TfidfVectorizer().fit_transform(articles_contents)
pairwise_similarity = tfidf * tfidf.T
pairwise_similarity.A[0]

print(pairwise_similarity.A[0][12])
print(pairwise_similarity.A[0][35])
print(pairwise_similarity.A[0][36])
print(pairwise_similarity.A[12][0])
print(pairwise_similarity.A[12][35])
print(pairwise_similarity.A[12][36])
print(pairwise_similarity.A[35][0])
print(pairwise_similarity.A[35][12])
print(pairwise_similarity.A[35][36])

ensure_pairs_exist_sql = """
INSERT INTO similarities (article_id_1, article_id_2, permid, sklearn_headline, sklearn_text)
  SELECT
    a1.article_id,
    a2.article_id,
    0,
    0,
    0
  FROM article a1
    INNER JOIN article a2
      ON a1.article_id > a2.article_id
  WHERE NOT EXISTS(
      SELECT *
      FROM similarities s
      WHERE s.article_id_1 == a1.article_id
            AND s.article_id_2 == a2.article_id
  );
"""


def clear_table(cur):
    cur.execute('DELETE FROM similarities')


def update_db(cur, id_1, id_2, value, column):
    cur.execute(f'UPDATE similarities SET {column} = ? WHERE article_id_1 = ? AND article_id_2 = ?',
                (value, id_1, id_2))


def insert_into(column, matrix, clear=False):
    with sqlite3.connect(str(db_file)) as con:
        cur = con.cursor()

        if clear:
            clear_table(cur)
            con.commit()

        cur.execute(ensure_pairs_exist_sql)
        con.commit()

        [update_db(cur, id_1 + 1, id_2 + 1, value, column)
         for (id_1, id_2), value in np.ndenumerate(matrix)
         if id_1 > id_2]
        con.commit()


insert_into('sklearn_text', pairwise_similarity.A, True)

articles_hl = [a.headline for a in articles]
tfidf = TfidfVectorizer().fit_transform(articles_hl)
pairwise_similarity = tfidf * tfidf.T
pairwise_similarity.A[0]

print(pairwise_similarity.A[0][12])
print(pairwise_similarity.A[0][35])
print(pairwise_similarity.A[0][36])
print(pairwise_similarity.A[12][0])
print(pairwise_similarity.A[12][35])
print(pairwise_similarity.A[12][36])
print(pairwise_similarity.A[35][0])
print(pairwise_similarity.A[35][12])
print(pairwise_similarity.A[35][36])

insert_into('sklearn_headline', pairwise_similarity.A)
