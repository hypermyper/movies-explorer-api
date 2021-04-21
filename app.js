const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(BASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const allowedCors = [
  'https://movies-explorer.ru',
  'http://api.movies-explorer.ru',
  'https://www.movies-explorer.ru',
  'http://www.api.movies-explorer.ru',
  'https://localhost:3001',
  'http://localhost:3001',
];

app.use(cors());

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors());
app.use(routes);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Мы на ${PORT} порту`);
});