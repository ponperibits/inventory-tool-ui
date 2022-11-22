/* eslint-disable no-unused-vars */
const Request = require('../utils/request');

exports.register = async (req, res, next) => {
  try {
    const data = await Request({
      url: '/v1/auth/register',
      data: req.body,
      method: 'POST',
    });
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.verifyEmailCode = async (req, res, next) => {
  try {
    const data = await Request({
      url: '/v1/auth/verify-code',
      data: req.body,
      method: 'POST',
    });
    req.user = data;
    next();
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await Request({
      url: '/v1/auth/login',
      data: req.body,
      method: 'POST',
    });
    req.user = data;
    next();
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.refreshExpiredToken = async body => {
  const data = await Request({
    data: body,
    method: 'POST',
    url: '/v1/auth/refresh-token',
  });
  return data;
};

exports.resendEmailCode = async (req, res, next) => {
  try {
    const data = await Request({
      url: '/v1/auth/resend-verification',
      method: 'POST',
      data: req.body,
    });
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
