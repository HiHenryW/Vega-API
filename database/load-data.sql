use sdcqa

load data local infile
'/Users/henrywang/Documents/software-engineering/hack-reactor/senior-phase/SDC/raw-data/questions.csv'

into table questions

fields terminated by ','

enclosed by '"'

lines terminated by '\n'

ignore 1 rows;

load data local infile
'/Users/henrywang/Documents/software-engineering/hack-reactor/senior-phase/SDC/raw-data/answers.csv'

into table answers

fields terminated by ','

enclosed by '"'

lines terminated by '\n'

ignore 1 rows;

load data local infile
'/Users/henrywang/Documents/software-engineering/hack-reactor/senior-phase/SDC/raw-data/answers_photos.csv'

into table photos

fields terminated by ','

enclosed by '"'

lines terminated by '\n'

ignore 1 rows;