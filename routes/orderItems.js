var express = require('express');
var router = express.Router();
const validations = require('../middleware/validations');
const authJwt = require('../middleware/authJwt');

var orderItem_controller = require('../controllers/orderItemController');

router.get('/:id', [authJwt.verifyToken], orderItem_controller.orderItem_detail);
router.get('/byorder/:order', [authJwt.verifyToken], orderItem_controller.orderItem_byorder);
router.post('/create', [authJwt.verifyToken], orderItem_controller.orderItem_create);
router.put('/:id', [authJwt.verifyToken], orderItem_controller.orderItem_update);
router.delete('/:id', [authJwt.verifyToken], orderItem_controller.orderItem_delete);

module.exports = router;