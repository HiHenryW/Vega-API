import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});

app.get('/', (req, res) => {
  res.send('Root of domain reached!');
});

app.get('/example', (req, res) => {
  res.send('Example route of domain reached!');
});
