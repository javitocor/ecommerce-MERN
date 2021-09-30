var express = require('express');
var router = express.Router();
var upload = require('../middleware/imageUpload');
const validations = require('../middleware/validations');
const authJwt = require('../middleware/authJwt');

var product_controller = require('../controllers/productController');

router.get('/', [authJwt.verifyToken], product_controller.product_list);
router.get('/:id', [authJwt.verifyToken], product_controller.product_detail);
router.post('/create', [authJwt.verifyToken, authJwt.isAdmin], product_controller.product_create);
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], product_controller.product_update);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], product_controller.product_delete);

module.exports = router;