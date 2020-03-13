const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/is-auth');
const profileController = require('../../controllers/profile');
const { check } = require('express-validator');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', isAuth, profileController.getMyProfile);

// @route   POST api/profile/
// @desc    Create or Update user's profile
// @access  Private
router.post(
  '/',
  [
    isAuth,
    [
      check('status', 'Status is required!')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  profileController.createAndUpdateProfile
);

module.exports = router;
