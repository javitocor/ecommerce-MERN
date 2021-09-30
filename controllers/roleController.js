const Role = require('../models/role');

const { validationResult } = require("express-validator");

exports.role_list = async (req, res, next) => {
  try {
    const roles = await Role.find({}).select("-__v");
    res.json(roles);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.role_detail = async (req, res, next) => {
  try {
    const role = await Role.findById(req.params.id).select("-__v");
    res.json(role);
  } catch (error) {
    res.json(error)
    next();
  }
};

exports.role_create = async (req, res, next) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };

    try {
      const {name} = req.body;
      const role = new Role({
        name,
      });
      await role.save();
      res.status(201);
      res.json({message: 'Role created successfully', role});
    } catch (error) {
      res.json(error)
      next();
    }
};

exports.role_update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };
    try {
      const role = await Role.findByIdAndUpdate(req.params.id, { $set: req.body, updated_at: Date.now() }, {new: true});
      res.status(200);
      res.json({message: 'Role updated successfully', role});
    } catch (error) {
      console.log(error)
      next();
    }
};

exports.role_delete = async (req, res, next) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(200);
    res.json({message: 'Role deleted Successfully'});
  } catch (error) {
    res.json(error)
    next();
  }
};