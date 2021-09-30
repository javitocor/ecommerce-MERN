var express = require('express');
var router = express.Router();
const validations = require('../middleware/validations');

var customer_controller = require('../controllers/customerController');

router.get('/', customer_controller.customer_list);
router.get('/:id', customer_controller.customer_detail);
router.put('/:id',   customer_controller.customer_update);
router.delete('/:id', customer_controller.customer_delete);

module.exports = router;