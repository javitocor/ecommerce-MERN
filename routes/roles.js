var express = require('express');
var router = express.Router();
const validations = require('../middleware/validations');
const authJwt = require('../middleware/authJwt');

var role_controller = require('../controllers/roleController');

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], role_controller.role_list);
router.get('/:id', [authJwt.verifyToken, authJwt.isAdmin], role_controller.role_detail);
router.post('/create', [authJwt.verifyToken, authJwt.isAdmin], role_controller.role_create);
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], role_controller.role_update);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], role_controller.role_delete);

module.exports = router;