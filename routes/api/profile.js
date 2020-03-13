const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/is-auth');
const profileController = require('../../controllers/profile');
const { check } = require('express-validator');

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:userId', profileController.getProfileById);

// @route   DELETE api/profile/
// @desc    Delete profile, user and posts
// @access  Private
router.delete('/', isAuth, profileController.deleteProfileUserPost);

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public
router.get('/', profileController.getAllProfiles);

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

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public
router.get('/', profileController.getAllProfiles);

module.exports = router;
