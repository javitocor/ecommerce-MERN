const OrderItem = require('../models/orderItem');

const { validationResult } = require("express-validator");


exports.orderItem_detail = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id).select("-__v").populate('product', { name: 1 }).populate('order');
    res.json(orderItem);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.orderItem_create = async (req, res, next) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };

    try {
      const {product, order, quantity} = req.body;
      const orderItem = new OrderItem({
        product,
        order,
        quantity
      });
      await orderItem.save();
      res.status(201);
      res.json({message: 'OrderItem created successfully', orderItem});
    } catch (error) {
      res.json(error)
      next();
    }
};

exports.orderItem_update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };
    try {
      const {quantity} = req.body;
      const orderItem = await OrderItem.findByIdAndUpdate(req.params.id, { $set: quantity, updated_at: Date.now() }, {new: true});
      res.status(200);
      res.json({message: 'OrderItem updated successfully', orderItem});
    } catch (error) {
      console.log(error)
      next();
    }
};

exports.orderItem_delete = async (req, res, next) => {
  try {
    await OrderItem.findByIdAndDelete(req.params.id);
    res.status(200);
    res.json({message: 'OrderItem deleted Successfully'});
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.orderItem_byorder = async function (req, res, next) {
  try {
    const order_items_by_order = await  OrderItem.find({order: req.params.order}).populate('product');
    res.status(200)
    res.json(order_items_by_order)
  } catch (error) {
    res.json(error)
    next();
  }
}