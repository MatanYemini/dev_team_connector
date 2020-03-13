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

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  [
    isAuth,
    [
      check('title', 'title is required')
        .not()
        .isEmpty(),
      check('company', 'company is required')
        .not()
        .isEmpty(),
      check('from', 'from date is required')
        .not()
        .isEmpty()
    ]
  ],
  profileController.addExperience
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  isAuth,
  profileController.deleteExperience
);

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  '/education',
  [
    isAuth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  profileController.addEducation
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', isAuth, profileController.deleteEducation);

module.exports = router;
