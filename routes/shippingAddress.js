var express = require('express');
var router = express.Router();
const validations = require('../middleware/validations');

var shippingAddress_controller = require('../controllers/shippingAddressController');

router.get('/', shippingAddress_controller.shippingAddress_list);
router.get('/:id', shippingAddress_controller.shippingAddress_detail);
router.post('/create',   shippingAddress_controller.shippingAddress_create);
router.put('/:id',   shippingAddress_controller.shippingAddress_update);
router.delete('/:id', shippingAddress_controller.shippingAddress_delete);

module.exports = router;