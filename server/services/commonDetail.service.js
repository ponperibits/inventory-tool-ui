const Request = require('../utils/request');

exports.getDashboardStats = async (req, res) => {
  try {
    const dashboardStats = await Request(
      {
        url: '/v1/commonDetail/dashboardStats',
        method: 'GET',
        params: req.query,
      },
      req.headers,
    );
    res.json(dashboardStats);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
