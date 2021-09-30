var express = require('express');
var router = express.Router();
const validations = require('../middleware/validations');

var category_controller = require('../controllers/categoryController');

router.get('/', category_controller.category_list);
router.get('/:id', category_controller.category_detail);
router.post('/create',   category_controller.category_create);
router.put('/:id',   category_controller.category_update);
router.delete('/:id', category_controller.category_delete);

module.exports = router;