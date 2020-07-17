DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  question_id INTEGER NULL DEFAULT NULL,
  question_body VARCHAR NULL DEFAULT NULL,
  question_date DATE NULL DEFAULT NULL,
  asker_name VARCHAR NULL DEFAULT NULL,
  question_helpfulness INTEGER NULL DEFAULT NULL,
  reported INTEGER NULL DEFAULT NULL,
  product_id VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (question_id)
);

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  answer_id INTEGER NULL DEFAULT NULL,
  answer_body VARCHAR NULL DEFAULT NULL,
  answer_date DATE NULL DEFAULT NULL,
  answerer_name VARCHAR NULL DEFAULT NULL,
  answer_helpfulness INTEGER NULL DEFAULT NULL,
  question_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (answer_id)
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  photo_url VARCHAR NULL DEFAULT NULL,
  answer_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (question_id);
ALTER TABLE photos ADD FOREIGN KEY (answer_id) REFERENCES answers (answer_id);

-- ---
-- Test Data
-- ---

-- INSERT INTO questions (id,question_id,question_body,question_date,asker_name,question_helpfulness,reported,product_id) VALUES
-- ('','','','','','','','');
-- INSERT INTO answers (id,answer_id,answer_body,answer_date,answerer_name,answer_helpfulness,question_id) VALUES
-- ('','','','','','','');
-- INSERT INTO photos (id,photo_url,answer_id) VALUES
-- ('','','');