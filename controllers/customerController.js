const Customer = require('../models/customer');

const { validationResult } = require("express-validator");

exports.customer_list = async (req, res, next) => {
  try {
    const customers = await Customer.find({}).select("-__v");
    res.json(customers);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.customer_detail = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id).select("-__v");
    res.json(customer);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.customer_update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };
    try {
      const customer = await Customer.findByIdAndUpdate(req.params.id, { $set: req.body, updated_at: Date.now() }, {new: true});
      res.status(200);
      res.json({message: 'Customer updated successfully', customer});
    } catch (error) {
      console.log(error)
      next();
    }
};

exports.customer_delete = async (req, res, next) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200);
    res.json({message: 'Customer deleted Successfully'});
  } catch (error) {
    res.json(error)
    next();
  }
};