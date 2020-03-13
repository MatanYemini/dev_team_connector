const Profile = require('../models/Profile');
const { check, validationResult } = require('express-validator');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

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

    let profileFields = {};
    // Build profile object (refers to the ovbject above as a referance)
    buildProfileObject(req, profileFields);
    buildSocialFields(req, profileFields);

    const profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      return updateProfile(profile, req, res, profileFields);
    }

    // Create
    return createProfile(profile, res, profileFields);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// functions in javascript can change the object that is recieved as param (like a reference)
function buildProfileObject(req, profileFields) {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills
  } = req.body;

  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }
}

function buildSocialFields(req, profileFields) {
  profileFields.social = {};
  const { youtube, facebook, twitter, instagram, linkedin } = req.body;

  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;
}

async function updateProfile(profile, req, res, profileFields) {
  profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true }
  );

  return res.json(profile);
}

async function createProfile(profile, res, profileFields) {
  profile = new Profile(profileFields);
  await profile.save();

  return res.json(profile);
}
