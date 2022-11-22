const path = require('path');

require('dotenv-safe').config({
  path: path.join(__dirname, '../.env'),
  allowEmptyValues: true,
});

module.exports = {
  mongo: {
    url: process.env.MONGO_URI,
    collection: process.env.MONGO_COLLECTION,
  },
  sessionTimeout: parseFloat(process.env.SESSION_TIMEOUT || '24', 10),
  api: {
    baseUrl: process.env.API_BASE_URL,
  },
};
