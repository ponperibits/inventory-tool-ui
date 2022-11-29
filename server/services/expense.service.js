const Request = require('../utils/request');

exports.list = async (req, res) => {
  try {
    const expenses = await Request(
      {
        url: '/v1/expense/all',
        method: 'GET',
        params: req.query,
      },
      req.headers,
    );
    res.json(expenses);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.paginate = async (req, res) => {
  try {
    const expenses = await Request(
      {
        url: '/v1/expense/paginate',
        method: 'GET',
        params: req.query,
      },
      req.headers,
    );
    res.json(expenses);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const expense = await Request(
      {
        url: '/v1/expense',
        method: 'POST',
        data: req.body,
      },
      req.headers,
    );
    res.json(expense);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await Request(
      {
        url: `/v1/expense/${expenseId}`,
        method: 'GET',
      },
      req.headers,
    );
    res.json(expense);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await Request(
      {
        url: `/v1/expense/${expenseId}`,
        method: 'PATCH',
        data: req.body,
      },
      req.headers,
    );
    res.json(expense);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
