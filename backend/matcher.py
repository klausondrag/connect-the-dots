from pathlib import Path
import sqlite3

import pandas as pd
from pandas import Int64Index

path_data = Path('sql')
path_data.mkdir(exist_ok=True)
db_file = path_data / 'db.sqlite'
with sqlite3.connect(str(db_file)) as con:
    df = pd.read_sql(con=con,
                     sql='SELECT s.*, a1.source_id AS source_id_1, a2.source_id AS source_id_2 FROM similarities s INNER JOIN article a1 ON s.article_id_1 = a1.article_id INNER JOIN article a2 ON s.article_id_2 = a2.article_id')
df.head(5)


def avg(row):
    return (row['permid'] * 2 + row['sklearn_headline'] * 2 + row['sklearn_text']) / 5


def prepare_df(df):
    df['sklearn_avg'] = df.apply(avg, axis=1)
    df = df[df['sklearn_avg'] > df['sklearn_avg'].mean()]
    df = df.sort_values('sklearn_avg', ascending=False)
    df = df[df.source_id_1 != df.source_id_2]
    df = df.reset_index(drop=True)
    return df


def get_cliques(df, threshold):
    cliques = []
    similarities = []
    while len(cliques) < 40:
        reuters = df[(df.source_id_1 == 3) | (df.source_id_2 == 3)]
        if len(reuters) == 0:
            return cliques
        c = [None, None, None, None, None, None]
        d = [None, None, 1, None, None, None]

        first_row = reuters.iloc[0]
        df = df.drop(df.head(1).index)

        #         print(first_row.sklearn_avg)
        c[int(first_row.source_id_1) - 1] = int(first_row.article_id_1)
        c[int(first_row.source_id_2) - 1] = int(first_row.article_id_2)
        d[int(first_row.source_id_1) - 1] = first_row['sklearn_avg']
        d[int(first_row.source_id_2) - 1] = first_row['sklearn_avg']
        index = 0

        while (c[0] is None or c[1] is None or c[2] is None or c[3] is None) and len(df) > (index + 1):
            df = df.reset_index(drop=True)
            new_row = df.iloc[index]
            #             print(new_row)
            if new_row['sklearn_avg'] < threshold:
                print(len(cliques))
                print(cliques, similarities)
                return cliques, similarities

            if c[int(new_row.source_id_1) - 1] is None and c[int(new_row.source_id_2) - 1] is not None:
                c[int(new_row.source_id_1) - 1] = int(new_row.article_id_1)
                d[int(new_row.source_id_1) - 1] = new_row['sklearn_avg']
                df = df.drop(Int64Index([index + 1], dtype='int64'))
            elif c[int(new_row.source_id_1) - 1] is not None and c[int(new_row.source_id_2) - 1] is None:
                c[int(new_row.source_id_2) - 1] = int(new_row.article_id_2)
                d[int(new_row.source_id_2) - 1] = new_row['sklearn_avg']
                df = df.drop(Int64Index([index + 1], dtype='int64'))
            else:
                index += 1
        for i in range(4):
            df = df[(df.article_id_1 != c[i]) & (df.article_id_2 != c[i])]
        cliques.append(c)
        similarities.append(d)

    print(len(cliques))
    print(cliques, similarities)
    return cliques, similarities


def write_db(cliques, similarities):
    with sqlite3.connect(str(db_file)) as con:
        cur = con.cursor()
        cur.execute('DELETE FROM matching')
        [cur.execute(f'INSERT INTO matching (article_id, group_id, similarity) VALUES (?, ?, ?)', (a1, i, a2))
         for i, (c, d) in enumerate(zip(cliques, similarities))
         for a1, a2 in zip(c, d)
         if a1 is not None]
        con.commit()


def do_it(df, threshold):
    df = prepare_df(df)
    cliques, similarities = get_cliques(df, threshold)
    write_db(cliques, similarities)
    print('Done')


do_it(df, 0.1)
