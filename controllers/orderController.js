const Order = require('../models/order');

const { validationResult } = require("express-validator");

exports.order_list = async (req, res, next) => {
  try {
    const orders = await Order.find({}).select("-__v");
    res.json(orders);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.order_detail = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).select("-__v");
    res.json(order);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.order_create = async (req, res, next) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };

    try {
      const order = new Order({
        customer: req.customerId,
      });
      await order.save();
      res.status(201);
      res.json({message: 'Order created successfully', order});
    } catch (error) {
      res.json(error)
      next();
    }
};

exports.order_update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };
    try {
      const order = await Order.findById(req.params.id).exec();
      if ( order.customer === req.customer._id) {
        order.complete = !order.complete;
        order.save();
        res.status(200);
        res.json({message: 'Order updated successfully', order});
      } else {
        res.status().json({message: 'You cannot update the Order'})
      }
      
    } catch (error) {
      console.log(error)
      next();
    }
};

exports.order_delete = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200);
    res.json({message: 'Order deleted Successfully'});
  } catch (error) {
    res.json(error)
    next();
  }
};