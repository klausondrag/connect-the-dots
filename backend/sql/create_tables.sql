DROP TABLE IF EXISTS company;
CREATE TABLE company (
  source_id INTEGER PRIMARY KEY,
  name      TEXT NOT NULL
);


DROP TABLE IF EXISTS article;
CREATE TABLE article (
  article_id  INTEGER PRIMARY KEY,
  source_id   INTEGER NOT NULL,
  headline    TEXT    NOT NULL,
  excerpt     TEXT    NOT NULL,
  image_url   TEXT    NOT NULL,
  article_url TEXT    NOT NULL,
  full_text   TEXT    NOT NULL,
  FOREIGN KEY (source_id) REFERENCES company (source_id)
);


DROP TABLE IF EXISTS matching;
CREATE TABLE matching (
  article_id INTEGER NOT NULL,
  group_id   INTEGER NOT NULL,
  PRIMARY KEY (article_id, group_id),
  FOREIGN KEY (article_id) REFERENCES article (article_id)
);

DROP TABLE IF EXISTS similarities;
CREATE TABLE similarities (
  article_id_1 INTEGER NOT NULL,
  article_id_2 INTEGER NOT NULL,
  permid       INTEGER NOT NULL,
  sklearn      INTEGER NOT NULL,
  PRIMARY KEY (article_id_1, article_id_2),
  FOREIGN KEY (article_id_1) REFERENCES article (article_id),
  FOREIGN KEY (article_id_2) REFERENCES article (article_id)
);
--
-- INSERT INTO similarities (article_id_1, article_id_2, permid, sklearn)
--   SELECT
--     a1.article_id,
--     a2.article_id,
--     0,
--     0
--   FROM article a1
--     INNER JOIN article a2
--       ON a1.article_id != a2.article_id
--   WHERE NOT EXISTS(
--       SELECT *
--       FROM similarities s
--       WHERE s.article_id_1 == a1.article_id
--             AND s.article_id_2 == a2.article_id
--   );
