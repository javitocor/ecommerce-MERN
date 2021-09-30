const Product = require('../models/product');

const { validationResult } = require("express-validator");

exports.product_list = async (req, res, next) => {
  try {
    const products = await Product.find({}).select("-__v");
    res.json(products);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.product_detail = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).select("-__v");
    res.json(product);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.product_create = async (req, res, next) => { 
  if (!(req.body.category instanceof Array)) {
    if (typeof req.body.category === 'undefined') {
      req.body.category = [];
    } else {
      req.body.category = new Array(req.body.category);
    }
  } 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };

    try {
      const url = req.protocol + '://' + req.get('host')
      const {name, price, stock, category} = req.body;
      let filename = null;
      if( req.file !== undefined) {
        filename = req.file.filename
      } else {
        filename = 'placeholder.png'
      }
      const product = new Product({
        name,
        price,
        stock,
        category,
        image: url + '/public/images/' + filename
      });
      await product.save();
      res.status(201);
      res.json({message: 'Product created successfully', product});
    } catch (error) {
      res.json(error)
      next();
    }
};

exports.product_update = async (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === 'undefined') {
        req.body.category = [];
      } else {
        req.body.category = new Array(req.body.category);
      }
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };
    try {
      const url = req.protocol + '://' + req.get('host')
      let image = '';
      if (req.file !== undefined) {
        image = url + '/public/images/' + req.file.filename;
      } else {
        image = req.body.image;
      }
      const product = await Product.findByIdAndUpdate(req.params.id, { $set: req.body, updated_at: Date.now(), image }, {new: true});
      res.status(200);
      res.json({message: 'Product updated successfully', product});
    } catch (error) {
      console.log(error)
      next();
    }
};

exports.product_delete = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200);
    res.json({message: 'Product deleted Successfully'});
  } catch (error) {
    res.json(error)
    next();
  }
};