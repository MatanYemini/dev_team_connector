const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.getMyProfile = async (req, res) => {};
