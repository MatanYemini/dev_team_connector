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

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', isAuth, postController.getAllPosts);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:id', isAuth, postController.getPostById);

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', isAuth, postController.deletePost);

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', isAuth, postController.likePost);

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', isAuth, postController.unlikePost);

module.exports = router;
