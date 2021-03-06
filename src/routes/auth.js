const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/auth');

const User = require('../models/user');

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter valid email!')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) return Promise.reject('User with this email already exists');
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 6 }),
    body('name').trim().notEmpty(),
  ],
  authController.signup,
);

router.post('/login', [], authController.signup);

module.exports = router;
