const Request = require('../utils/request');

exports.list = async (req, res) => {
  try {
    const products = await Request(
      {
        url: '/v1/product/all',
        method: 'GET',
        params: req.query,
      },
      req.headers,
    );
    res.json(products);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.paginate = async (req, res) => {
  try {
    const parties = await Request(
      {
        url: '/v1/product/paginate',
        method: 'GET',
        params: req.query,
      },
      req.headers,
    );
    res.json(parties);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const product = await Request(
      {
        url: '/v1/product',
        method: 'POST',
        data: req.body,
      },
      req.headers,
    );
    res.json(product);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Request(
      {
        url: `/v1/product/${productId}`,
        method: 'GET',
      },
      req.headers,
    );
    res.json(product);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Request(
      {
        url: `/v1/product/${productId}`,
        method: 'PATCH',
        data: req.body,
      },
      req.headers,
    );
    res.json(product);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
