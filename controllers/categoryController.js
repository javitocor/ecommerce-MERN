const Category = require('../models/category');

const { validationResult } = require("express-validator");

exports.category_list = async (req, res, next) => {
  try {
    const categories = await Category.find({}).select("-__v");
    res.json(categories);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.category_detail = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id).select("-__v");
    res.json(category);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.category_create = async (req, res, next) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };

    try {
      const {name} = req.body;
      const category = new Category({
        name,
      });
      await category.save();
      res.status(201);
      res.json({message: 'Category created successfully', category});
    } catch (error) {
      res.json(error)
      next();
    }
};

exports.category_update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, { $set: req.body, updated_at: Date.now() }, {new: true});
      res.status(200);
      res.json({message: 'Category updated successfully', category});
    } catch (error) {
      console.log(error)
      next();
    }
};

exports.category_delete = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200);
    res.json({message: 'Category deleted Successfully'});
  } catch (error) {
    res.json(error)
    next();
  }
};