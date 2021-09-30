var express = require('express');
var router = express.Router();
var upload = require('../middleware/imageUpload');
const validations = require('../middleware/validations');

var orderItem_controller = require('../controllers/orderItemController');

router.get('/', orderItem_controller.orderItem_list);
router.get('/:id', orderItem_controller.orderItem_detail);
router.post('/create',   orderItem_controller.orderItem_create);
router.put('/:id',   orderItem_controller.orderItem_update);
router.delete('/:id', orderItem_controller.orderItem_delete);

module.exports = router;