var express = require('express');
var router = express.Router();
const validations = require('../middleware/validations');
const authJwt = require('../middleware/authJwt');

var category_controller = require('../controllers/categoryController');

router.get('/', [authJwt.verifyToken], category_controller.category_list);
router.get('/:id', [authJwt.verifyToken, authJwt.isAdmin], category_controller.category_detail);
router.post('/create', [authJwt.verifyToken, authJwt.isAdmin], category_controller.category_create);
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], category_controller.category_update);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], category_controller.category_delete);

module.exports = router;