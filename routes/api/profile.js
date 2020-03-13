const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/is-auth');
const profileController = require('../../controllers/profile');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/profile', isAuth, profileController.getMyProfile);

module.exports = router;
