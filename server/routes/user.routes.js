const express = require('express');
const services = require('../services/user.service');

const router = express.Router();

router.get('', services.fetch);
router.patch('', services.update);

module.exports = router;
