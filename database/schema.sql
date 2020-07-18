create database
if not exists sdcqa;

use sdcqa;

drop table if exists questions;

create table questions
(
  question_id int primary key,
  question_body text,
  question_date date,
  asker_name varchar
  (255),
  question_helpfulness int,
  reported int,
  product_id varchar
  (255)
);

drop table if exists answers;

create table answers
(
  answer_id int primary key,
  answer_body text,
  answer_date date,
  answerer_name varchar(255),
  answer_helpfulness int,
  question_id int
);

drop table if exists photos;

create table photos
(
  id int primary key auto_increment,
  photo_url varchar
(255),
  answer_id int
);

alter table answers add foreign key (question_id) references questions (question_id);
alter table photos add foreign key (answer_id) references answers (answer_id);