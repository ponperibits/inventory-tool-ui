const moment = require('moment-timezone');
const logger = require('../logger');
const { refreshExpiredToken } = require('../services/auth.service');

async function protectSession(req, res, next) {
  const { email, token, refreshToken, expiresIn } = req.session;

  if (!token) {
    return res.redirect('/auth');
  }

  if (moment().isBefore(expiresIn)) {
    req.headers = {
      Authorization: `Bearer ${token}`,
    };

    return next();
  }

  try {
    const newToken = await refreshExpiredToken({ email, refreshToken });
    req.session.token = newToken.accessToken;
    req.session.refreshToken = newToken.refreshToken;
    req.session.expiresIn = newToken.expiresIn;
    req.headers = {
      Authorization: `Bearer ${newToken.accessToken}`,
    };
    return next();
  } catch (err) {
    logger.error(
      JSON.stringify({
        error: err.message,
        data: err.response ? err.response.data : err.response,
      }),
    );
    return res.redirect('/auth');
  }
}

function setDetails(req, res) {
  const {
    user,
    token: { accessToken, refreshToken, expiresIn },
  } = req.user;
  req.session.token = accessToken;
  req.session.refreshToken = refreshToken;
  req.session.expiresIn = expiresIn;
  req.session.email = user.email;
  res.cookie('user', user);
  res.json({ ...user });
}

function isActive(req, res) {
  if (req.session.token) {
    res.send({ isUser: true });
  } else {
    res.send(false);
  }
}

function logout(req, res) {
  req.session.destroy();
  res.json('logged out');
}

module.exports = { protectSession, setDetails, isActive, logout };
