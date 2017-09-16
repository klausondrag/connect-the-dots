DROP TABLE IF EXISTS article;
CREATE TABLE article (
  article_id INTEGER PRIMARY KEY,
  source     TEXT NOT NULL,
  headline   TEXT NOT NULL,
  excerpt    TEXT NOT NULL,
  image_url  TEXT NOT NULL,
  full_text  TEXT NOT NULL
);


DROP TABLE IF EXISTS matching;
CREATE TABLE matching (
  article_id INTEGER NOT NULL,
  group_id   INTEGER NOT NULL,
  FOREIGN KEY (article_id) REFERENCES article (article_id)
);