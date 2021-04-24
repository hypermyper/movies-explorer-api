require('dotenv').config();

const { BASE_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;

const { JWT_SECRET = 'some-secret-key' } = process.env;

module.exports = {
  BASE_URL,
  JWT_SECRET,
};
