const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Vaidation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email,
        name,
        password: hashedPw,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: 'User created', userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};

exports.singin = (req, res, next) => {
  const email = req.body.email;
  const password = res.body.password;
  User.findOne(email)
    .then((user) => {
      if (!user) {
        const error = new Error('A user with this email could not be found');
        error.statusCode = 404;
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};
