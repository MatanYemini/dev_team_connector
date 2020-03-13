const Profile = require('../models/Profile');
const { check, validationResult } = require('express-validator');

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.createAndUpdateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object
    let profileFields = {};
    profileFields.user = req.user.id;
    profileFields.company = company ? company : undefined;
    profileFields.website = website ? website : undefined;
    profileFields.location = location ? location : undefined;
    profileFields.bio = bio ? bio : undefined;
    profileFields.status = status ? status : undefined;
    profileFields.githubusername = githubusername ? githubusername : undefined;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    console.log(profileFields.skills);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// functions in javascript can change the object that is recieved as param (like a reference)
function buildProfileObject(req, profileFields) {}

updateProfile = async (req, res) => {};

createProfile = async (req, res) => {};
