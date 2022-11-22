/* eslint-disable object-shorthand */
const express = require('express');
// const multer = require('multer');
const session = require('../middlewares/sessionManager');

// const storage = multer.memoryStorage({
//   // eslint-disable-next-line func-names
//   destination: function(req, file, callback) {
//     callback(null, '');
//   },
// });
// const upload = multer({ storage }).single('file');
// router.use('/file', upload, session.protected, fileRoutes);

const router = express.Router();

module.exports = router;
