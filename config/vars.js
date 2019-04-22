const path = require('path');

require('dotenv-safe').load({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example'),
});

module.exports = {
  alphabet: process.env.ALPHABET,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URI_TESTS
      : process.env.MONGO_URI,
  },
  webhost: process.env.WEBHOST,
  hashLength: process.env.HASH_LENGTH,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};