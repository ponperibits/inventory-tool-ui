const axios = require('axios');
const { get } = require('lodash');
const logger = require('../logger');
const { api } = require('../config');

const baseURL = api.baseUrl;

function CustomException(err) {
  return {
    status: get(err, 'response.status', 500),
    message: get(err, 'response.data.message', 'Internal Server Error'),
  };
}

module.exports = async function call(config = {}, headers = {}) {
  try {
    const response = await axios.request({
      baseURL,
      headers,
      ...config,
    });
    return response.data;
  } catch (err) {
    logger.error(
      JSON.stringify({
        error: err.message,
        url: `${baseURL}${config.url}`,
        method: config.method,
        data: err.response ? err.response.data : err.response,
      }),
    );
    throw new CustomException(err);
  }
};
