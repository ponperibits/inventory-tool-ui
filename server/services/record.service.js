const Request = require('../utils/request');

exports.list = async (req, res) => {
  try {
    const records = await Request(
      {
        url: '/v1/record/all',
        method: 'GET',
        params: req.query,
      },
      req.headers,
    );
    res.json(records);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { recordId } = req.params;

    const record = await Request(
      {
        url: `/v1/record/${recordId}`,
        method: 'GET',
      },
      req.headers,
    );
    res.json(record);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
