var express = require('express');
var router = express.Router();
var upload = require('../middleware/imageUpload');
const validations = require('../middleware/validations');

var product_controller = require('../controllers/productController');

router.get('/', product_controller.product_list);
router.get('/:id', product_controller.product_detail);
router.post('/create',   product_controller.product_create);
router.put('/:id',   product_controller.product_update);
router.delete('/:id', product_controller.product_delete);

module.exports = router;