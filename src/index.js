import 'dotenv/config';
import express, { query } from 'express';
import cors from 'cors';
const bodyParser = require('body-parser');
const connection = require('../database/db');
const mysql = require('mysql');
const { convertFormatQuestions, convertFormatAnswers } = require('./helpers');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});

app.get('/', (req, res) => {
  res.send('Root of domain reached!');
});

// QUESTIONS LIST SERVICE
app.get('/qa/:id', (req, res) => {
  // res.send('Example route of domain reached!' + req.params.id);
  let queryStr = `select * from questions join answers on questions.question_id=answers.question_id where questions.product_id=${mysql.escape(
    req.params.id
  )}`;

  let options = { sql: queryStr, nestTables: true };
  connection.query(options, (err, results, fields) => {
    if (err) {
      console.log(err);
    }

    res.status(200).json(convertFormatQuestions(results));
  });
});

// ANSWERS LIST SERVICE
app.get('/qa/:id/answers', (req, res) => {
  let queryStr = `select * from answers left join photos on answers.answer_id=photos.answer_id where answers.reported=0 and answers.question_id=${mysql.escape(
    req.params.id
  )}`;

  let options = { sql: queryStr, nestTables: true };
  connection.query(options, (err, results, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }

    res.status(200).json(convertFormatAnswers(results));
  });
});

// ADD QUESTION SERVICE
app.post('/qa/:id', (req, res) => {
  // console.log(req.query);
  let queryStr = `insert into questions(question_id,product_id, question_body, question_date, asker_name, email, reported, helpfulness) values(?,?,?,?,?,?,?,?)`;
  let timeStamp = new Date();

  connection.query(
    `select max(question_id) from questions`,
    (err, results, fields) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        let newId = 1 + results[0]['max(question_id)'];
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

// ADD ANSWER SERVICE
app.post('/qa/:question_id/answers', (req, res) => {
  let queryStr = `insert into answers(answer_id, question_id, answer_body, answer_date, answerer_name, email, reported, helpfulness) values(?,?,?,?,?,?,?,?)`;
  let timeStamp = new Date();

  connection.query(
    `select max(answer_id) from answers`,
    (err, results, fields) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        let newId = 1 + results[0]['max(answer_id)'];
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

// MARK QUESTION AS HELPFUL SERVICE
app.put('/qa/:question_id/helpful', (req, res) => {
  let queryStr = `update questions set helpfulness=? where question_id=?`;

  connection.query(
    `select helpfulness from questions where question_id=${req.params.question_id}`,
    (err, results, fields) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        let newHelpfulness = 1 + results[0].helpfulness;
        let inputs = [newHelpfulness, req.params.question_id];
        connection.query(queryStr, inputs, (err, results, fields) => {
          if (err) {
            console.log(err);
            res.sendStatus(404);
          }

          res.sendStatus(204);
        });
      }
    }
  );
});
