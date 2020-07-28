const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '18.144.10.13',
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
});

connection.connect((err) => {
  if (err) {
    console.log('failed to connect to MySQL from db, err: ', err);
    console.log('process.env: ', process.env);
  } else {
    console.log('Connected to the MySQL server.');
  }
});

module.exports = connection;
