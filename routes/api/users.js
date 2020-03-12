const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get('/users', (req, res) => res.send('User route'));

module.exports = router;
