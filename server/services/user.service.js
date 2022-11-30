const Request = require('../utils/request');

exports.fetch = async (req, res) => {
  try {
    const user = await Request(
      {
        url: `/v1/user`,
        method: 'GET',
      },
      req.headers,
    );
    res.json(user);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const user = await Request(
      {
        url: `/v1/user`,
        method: 'PATCH',
        data: req.body,
      },
      req.headers,
    );
    res.json(user);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
