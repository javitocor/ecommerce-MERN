var express = require('express');
var router = express.Router();
const validations = require('../middleware/validations');
const authJwt = require('../middleware/authJwt');

var customer_controller = require('../controllers/customerController');

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], customer_controller.customer_list);
router.get('/:id', [authJwt.verifyToken], customer_controller.customer_detail);
router.put('/:id', [authJwt.verifyToken],   customer_controller.customer_update);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], customer_controller.customer_delete);

module.exports = router;