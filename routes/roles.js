var express = require('express');
var router = express.Router();
const validations = require('../middleware/validations');

var role_controller = require('../controllers/roleController');

router.get('/', role_controller.role_list);
router.get('/:id', role_controller.role_detail);
router.post('/create',   role_controller.role_create);
router.put('/:id',   role_controller.role_update);
router.delete('/:id', role_controller.role_delete);

module.exports = router;