const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the MySQL server.');
  }
});

module.exports = connection;
