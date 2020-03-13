const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/is-auth');
const authController = require('../../controllers/auth');
const { body, check, validationResult } = require('express-validator');

// @route   GET api/auth/authenticate
// @desc    Authenticate & getToken
// @access  Public
router.get('/authenticate', isAuth, authController.getUser);

// @route   POST api/auth/login
// @desc    Login
// @access  Public
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),

    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password.')
  ],
  authController.login
);

module.exports = router;
