/* eslint-disable object-shorthand */
const express = require('express');
// const multer = require('multer');
const session = require('../middlewares/sessionManager');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

const partyRoutes = require('./party.routes');
const productRoutes = require('./product.routes');
const transactionRoutes = require('./transaction.routes');
const recordRoutes = require('./record.routes');
const expenseRoutes = require('./expense.routes');

const commonDetailRoutes = require('./commonDetail.routes');

// const storage = multer.memoryStorage({
//   // eslint-disable-next-line func-names
//   destination: function(req, file, callback) {
//     callback(null, '');
//   },
// });
// const upload = multer({ storage }).single('file');
// router.use('/file', upload, session.protected, fileRoutes);

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', session.protectSession, userRoutes);

router.use('/party', session.protectSession, partyRoutes);
router.use('/product', session.protectSession, productRoutes);
router.use('/transaction', session.protectSession, transactionRoutes);
router.use('/record', session.protectSession, recordRoutes);
router.use('/expense', session.protectSession, expenseRoutes);

router.use('/commonDetail', session.protectSession, commonDetailRoutes);

module.exports = router;
