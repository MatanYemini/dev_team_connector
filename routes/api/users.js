const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
    '/users',
    [
        check('name', 'Name is required')
        .trim()
        .not()
        .isEmpty(),
        check('email', 'Please include a valid email').trim().isEmail(),
        check(
        'password',
        'Please enter a password with 6 or more character'
        ).isLength({min: 6})
    ], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password} = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                res.status(400).json({ errors: [{ msg: 'User already exists' }] })
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
        
        console.log(req.body);
        res.send('User route');
        res.status(500).send('Server Error');
    }
);

module.exports = router;
