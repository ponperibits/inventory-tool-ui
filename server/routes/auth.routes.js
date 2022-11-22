const express = require('express');
const service = require('../services/auth.service');
const session = require('../middlewares/sessionManager');
const router = express.Router();

router.get('', session.isActive);

router.get('/logout', session.logout);

router.post('/register', service.register);

router.post('/verify-code', service.verifyEmailCode, session.setDetails);

router.post('/login', service.login, session.setDetails);

router.post('/resend-verification', service.resendEmailCode);

module.exports = router;
