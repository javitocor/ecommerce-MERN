var express = require('express');
var router = express.Router();
const validations = require('../middleware/validations');
const authJwt = require('../middleware/authJwt');

var order_controller = require('../controllers/orderController');

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], order_controller.order_list);
router.get('/:id', [authJwt.verifyToken], order_controller.order_detail);
router.post('/create', [authJwt.verifyToken], order_controller.order_create);
router.put('/:id', [authJwt.verifyToken], order_controller.order_update);
router.delete('/:id', [authJwt.verifyToken], order_controller.order_delete);

module.exports = router;