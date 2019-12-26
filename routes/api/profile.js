const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route    GET api/profile/me
// @desc     get current users profile
// @access   private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar'],
    );

    if (!profile) {
      res.status(400).send({
        msg: 'No profile available'
      });
    }
    else {
      res.send(profile);
    }

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;