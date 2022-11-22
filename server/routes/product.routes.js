const express = require('express');
const services = require('../services/product.service');

const router = express.Router();

router.get('', services.list);
router.get('/:productId', services.fetch);
router.post('', services.create);
router.patch('/:productId', services.update);

module.exports = router;
