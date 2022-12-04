const express = require('express');
const services = require('../services/transaction.service');

const router = express.Router();

router.get('', services.list);
router.get('/:transactionId', services.fetch);
router.post('', services.create);
router.patch('/:transactionId', services.update);
router.delete('/:transactionId', services.delete);

module.exports = router;
