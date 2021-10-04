const ShippingAddress = require('../models/shippingAddress');

const { validationResult } = require("express-validator");

exports.shippingAddress_list = async (req, res, next) => {
  try {
    const shippingAddresss = await ShippingAddress.find({}).select("-__v");
    res.json(shippingAddresss);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.shippingAddress_detail = async (req, res, next) => {
  try {
    const shippingAddress = await ShippingAddress.findById(req.params.id).select("-__v").populate('customer');
    res.json(shippingAddress);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.shippingAddress_create = async (req, res, next) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };

    try {
      const {customer, order, address, city, state, zipcode} = req.body;
      const shippingAddress = new ShippingAddress({
        customer,
        order,
        address,
        city,
        state,
        zipcode,
      });
      await shippingAddress.save();
      res.status(201);
      res.json({message: 'ShippingAddress created successfully', shippingAddress});
    } catch (error) {
      res.json(error)
      next();
    }
};

exports.shippingAddress_update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };
    try {
      const shippingAddress = await ShippingAddress.findByIdAndUpdate(req.params.id, { $set: req.body, updated_at: Date.now() }, {new: true});
      res.status(200);
      res.json({message: 'ShippingAddress updated successfully', shippingAddress});
    } catch (error) {
      console.log(error)
      next();
    }
};

exports.shippingAddress_delete = async (req, res, next) => {
  try {
    await ShippingAddress.findByIdAndDelete(req.params.id);
    res.status(200);
    res.json({message: 'ShippingAddress deleted Successfully'});
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.shippingAddress_by_customer = async (req, res, next) => {
  try {
    const addresses_by_customer = await ShippingAddress.find({customer: req.params.customer});
    res.status(200);
    res.json({message: 'ShippingAddresses by customer Successful', addresses_by_customer});
  } catch (error) {
    res.json(error)
    next();
  };
};