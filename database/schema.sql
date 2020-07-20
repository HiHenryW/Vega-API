create database
if not exists sdcqa;

use sdcqa;

drop table if exists photos;
drop table if exists answers;
drop table if exists questions;

create table questions
(
  question_id int primary key,
  product_id int,
  question_body text,
  question_date date,
  asker_name varchar
  (255),
  email varchar(255),
  reported int,
  helpfulness int
);

create table answers
(
  answer_id int primary key,
  question_id int,
  answer_body text,
  answer_date date,
  answerer_name varchar(255),
  email varchar(255),
  reported int,
  helpfulness int
);

create table photos
(
  photo_id int primary key,
  answer_id int,
  photo_url varchar
(255)
);

alter table answers add foreign key (question_id) references questions (question_id);
alter table photos add foreign key (answer_id) references answers (answer_id);