const express = require('express');
const services = require('../services/commonDetail.service');

const router = express.Router();

router.get('/dashboardStats', services.getDashboardStats);

module.exports = router;
