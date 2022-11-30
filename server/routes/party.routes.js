const express = require('express');
const services = require('../services/party.service');

const router = express.Router();

router.get('/paginate', services.paginate);
router.get('', services.list);
router.get('/:partyId', services.fetch);
router.post('', services.create);
router.patch('/:partyId', services.update);

module.exports = router;
