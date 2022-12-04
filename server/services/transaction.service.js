const Request = require('../utils/request');

exports.list = async (req, res) => {
  try {
    const transactions = await Request(
      {
        url: '/v1/transaction/all',
        method: 'GET',
        params: req.query,
      },
      req.headers,
    );
    res.json(transactions);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const transaction = await Request(
      {
        url: '/v1/transaction',
        method: 'POST',
        data: req.body,
      },
      req.headers,
    );
    res.json(transaction);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Request(
      {
        url: `/v1/transaction/${transactionId}`,
        method: 'GET',
      },
      req.headers,
    );
    res.json(transaction);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Request(
      {
        url: `/v1/transaction/${transactionId}`,
        method: 'PATCH',
        data: req.body,
      },
      req.headers,
    );
    res.json(transaction);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Request(
      {
        url: `/v1/transaction/${transactionId}`,
        method: 'DELETE',
      },
      req.headers,
    );
    res.json(transaction);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
