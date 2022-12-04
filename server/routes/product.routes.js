const express = require('express');
const services = require('../services/product.service');

const router = express.Router();

router.get('/paginate', services.paginate);
router.get('', services.list);
router.get('/:productId', services.fetch);
router.post('', services.create);
router.patch('/:productId', services.update);
router.delete('/:productId', services.delete);

module.exports = router;
