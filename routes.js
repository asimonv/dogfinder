var express = require('express');
var router = express.Router();

const index = require('./routes/index');
const auth = require('./routes/auth');
const dogs = require('./routes/dogs');

router.use('/', index);
router.use('/auth', auth);
router.use('/dogs', dogs);

module.exports = router;
