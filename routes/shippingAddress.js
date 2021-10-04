var express = require('express');
var router = express.Router();
const validations = require('../middleware/validations');
const authJwt = require('../middleware/authJwt');

var shippingAddress_controller = require('../controllers/shippingAddressController');

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], shippingAddress_controller.shippingAddress_list);
router.get('/:id', [authJwt.verifyToken], shippingAddress_controller.shippingAddress_detail);
router.get('/byCustomer/:customer', [authJwt.verifyToken], shippingAddress_controller.shippingAddress_by_customer);
router.post('/create', [authJwt.verifyToken], shippingAddress_controller.shippingAddress_create);
router.put('/:id', [authJwt.verifyToken], shippingAddress_controller.shippingAddress_update);
router.delete('/:id', [authJwt.verifyToken], shippingAddress_controller.shippingAddress_delete);

module.exports = router;