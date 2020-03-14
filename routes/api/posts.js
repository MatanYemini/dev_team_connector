const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const isAuth = require('../../middleware/is-auth');
const postController = require('../../controllers/post');

// @route   GET api/posts
// @desc    Create a post
// @access  Public
router.post(
  '/',
  [
    isAuth,
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  postController.addPost
);

module.exports = router;
