const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // get user without password
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    let loadedUser = await User.findOne({ email: email });
    if (!loadedUser) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    const isMatch = await bcrypt.compare(password, loadedUser.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    const payload = {
      user: {
        id: loadedUser._id.toString() // mongoose does abstraction for it (_id = id)
      }
    };
    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: '1h'
    });
    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
