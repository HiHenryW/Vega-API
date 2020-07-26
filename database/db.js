const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log('failed to connect to MySQL from db, err: ', err);
    // console.log('process.env: ', process.env);
  } else {
    console.log('Connected to the MySQL server.');
  }
});

module.exports = connection;
