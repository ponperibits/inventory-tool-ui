const express = require('express');
const services = require('../services/record.service');

const router = express.Router();

router.get('/paginate', services.paginate);
router.get('', services.list);
router.get('/:recordId', services.fetch);

module.exports = router;
