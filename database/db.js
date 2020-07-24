const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'db',
  port: '3306',
  user: 'mysql',
  password: 'password',
  database: 'sdcqa',
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the MySQL server.');
  }
});

module.exports = connection;
