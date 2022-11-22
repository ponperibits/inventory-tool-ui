const Request = require('../utils/request');

exports.list = async (req, res) => {
  try {
    const parties = await Request(
      {
        url: '/v1/party/all',
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
    const party = await Request(
      {
        url: '/v1/party',
        method: 'POST',
        data: req.body,
      },
      req.headers,
    );
    res.json(party);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { partyId } = req.params;

    const party = await Request(
      {
        url: `/v1/party/${partyId}`,
        method: 'GET',
      },
      req.headers,
    );
    res.json(party);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { partyId } = req.params;

    const party = await Request(
      {
        url: `/v1/party/${partyId}`,
        method: 'PATCH',
        data: req.body,
      },
      req.headers,
    );
    res.json(party);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
