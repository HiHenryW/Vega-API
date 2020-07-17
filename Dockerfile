FROM mysql

ENV MYSQL_DATABASE sdcqa

COPY ./schema.sql /docker-entrypoint-initdb.d/