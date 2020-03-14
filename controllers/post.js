const { validationResult } = require('express-validator');
const Post = require('../models/Post');
const Profile = require('../models/Profile');
const User = require('../models/User');

exports.addPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password'); // The id is at the request since token, also we dont want to return the password
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
