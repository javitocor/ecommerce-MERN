var express = require('express');
var router = express.Router();
var upload = require('../middleware/imageUpload');
const validations = require('../middleware/validations');

var order_controller = require('../controllers/orderController');

router.get('/', order_controller.order_list);
router.get('/:id', order_controller.order_detail);
router.post('/create', order_controller.order_create);
router.put('/:id',   order_controller.order_update);
router.delete('/:id', order_controller.order_delete);

module.exports = router;