import 'dotenv/config';
import express, { query } from 'express';
import cors from 'cors';
const bodyParser = require('body-parser');
const connection = require('../database/db');
const mysql = require('mysql');
const { convertFormatQuestions, convertFormatAnswers } = require('./helpers');
const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

app.get('/', (req, res) => {
  res.send('Root of domain reached!');
});

// LOADER.IO VERIFICATION
app.get('/:token', (req, res) => {
  if (req.params.token === 'loaderio-0e8f49f909d45538ac3ebb1dc65e2922') {
    res.send('loaderio-0e8f49f909d45538ac3ebb1dc65e2922');
  } else {
    res.sendStatus(404);
  }
});

// QUESTIONS LIST ROUTE
app.get('/qa/:id', (req, res) => {
  // res.send('Example route of domain reached!' + req.params.id);
  let queryStr = `SELECT * FROM questions JOIN answers ON questions.question_id=answers.question_id WHERE questions.product_id=${mysql.escape(
    req.params.id
  )}`;

  let options = { sql: queryStr, nestTables: true };
  connection.query(options, (err, results, fields) => {
    if (err) {
      console.log(err);
    }

    res.status(200).json(convertFormatQuestions(results, req.params.id));
  });
});

// ANSWERS LIST ROUTE
app.get('/qa/:id/answers', (req, res) => {
  let queryStr = `SELECT * FROM answers LEFT JOIN photos ON answers.answer_id=photos.answer_id WHERE answers.reported=0 AND answers.question_id=${mysql.escape(
    req.params.id
  )}`;

  let options = { sql: queryStr, nestTables: true };
  connection.query(options, (err, results, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }

    res.status(200).json(convertFormatAnswers(results, req.params.id));
  });
});

// ADD QUESTION ROUTE
app.post('/qa/:id', (req, res) => {
  // console.log(req.query);
  let queryStr = `INSERT INTO questions(question_id,product_id, question_body, question_date, asker_name, email, reported, helpfulness) VALUES(?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE question_id=question_id+1`;
  let timeStamp = new Date();

  connection.query(
    `SELECT MAX(question_id) FROM questions`,
    (err, results, fields) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        let newId = 1 + results[0]['MAX(question_id)'];
        let inputs = [
          newId,
          req.params.id,
          req.query.body,
          timeStamp,
          req.query.name,
          req.query.email,
          0,
          0,
        ];
        connection.query(queryStr, inputs, (err, results, fields) => {
          if (err) {
            console.log(err);
            res.sendStatus(404);
          }

          res.sendStatus(201);
        });
      }
    }
  );
});

// ADD ANSWER ROUTE
app.post('/qa/:question_id/answers', (req, res) => {
  let queryStr = `INSERT INTO answers(answer_id, question_id, answer_body, answer_date, answerer_name, email, reported, helpfulness) VALUES(?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE answer_id=answer_id+1`;
  let timeStamp = new Date();

  connection.query(
    `SELECT MAX(answer_id) FROM answers`,
    (err, results, fields) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        let newId = 1 + results[0]['MAX(answer_id)'];
        let inputs = [
          newId,
          req.params.question_id,
          req.query.body,
          timeStamp,
          req.query.name,
          req.query.email,
          0,
          0,
        ];
        connection.query(queryStr, inputs, (err, results, fields) => {
          if (err) {
            console.log(err);
            res.sendStatus(404);
          }

          res.sendStatus(201);
        });
      }
    }
  );
});

// MARK QUESTION AS HELPFUL ROUTE
app.put('/qa/:question_id/helpful', (req, res) => {
  let queryStr = `UPDATE questions SET helpfulness=helpfulness+1 WHERE question_id=${req.params.question_id}`;
  connection.query(queryStr, (err, results, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }

    res.sendStatus(204);
  });
});

// REPORT QUESTION ROUTE
app.put('/qa/:question_id/report', (req, res) => {
  let queryStr = `UPDATE questions SET reported=1 WHERE question_id=${req.params.question_id}`;

  connection.query(queryStr, (err, results, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }

    res.sendStatus(204);
  });
});

// MARK ANSWER AS HELPFUL ROUTE
app.put('/qa/answer/:answer_id/helpful', (req, res) => {
  let queryStr = `UPDATE answers SET helpfulness=helpfulness+1 WHERE answer_id=${req.params.answer_id}`;
  connection.query(queryStr, (err, results, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }

    res.sendStatus(204);
  });
});

// REPORT ANSWER ROUTE
app.put('/qa/answer/:answer_id/report', (req, res) => {
  let queryStr = `UPDATE answers SET reported=1 WHERE answer_id=${req.params.answer_id}`;

  connection.query(queryStr, (err, results, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }

    res.sendStatus(204);
  });
});
