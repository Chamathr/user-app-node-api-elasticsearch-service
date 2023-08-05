var express = require('express');
var router = express.Router();
const RootController = require('../controllers/root.controller')

/*root routes*/
router.get('/', RootController.healthCheck);

module.exports = router