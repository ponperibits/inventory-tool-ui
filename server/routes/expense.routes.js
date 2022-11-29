const express = require('express');
const services = require('../services/expense.service');

const router = express.Router();

router.get('/paginate', services.paginate);
router.get('', services.list);
router.get('/:expenseId', services.fetch);
router.post('', services.create);
router.patch('/:expenseId', services.update);

module.exports = router;
