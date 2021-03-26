const express = require("express");
const router = express.Router();
const isAuthenticated = require("../Middleware/isAuthenticated");
const User = require("../models/User");

// * get profile
router.get("/profile", isAuthenticated, async (req, res) => {
  const user = await User.findById(req.user._id);
  const stars = user.stars;
  const newuser = { ...user.toObject(), stars };
  // console.log(newuser);
  res.status(200).json({ success: true, data: newuser });
});

// * Follow a user by id
router.post("/follow/:id", isAuthenticated, async (req, res) => {
  try {
    //Check if the user to be followed exists
    const userToFollow = await User.findById(req.params.id).lean();
    if (!userToFollow) {
      return res.status(400).json({
        success: false,
        message: `User with id of ${req.params.id} doesn't exist`,
      });
    }
    //Check if the person is trying to follow himself
    if (userToFollow._id.equals(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "I know you are lonely bro. But, seriously, get a life lmao",
      });
    }
    //Check if you are already following that user
    if (userToFollow.followers.includes(req.user._id) === true) {
      return res.status(400).json({
        success: false,
        message: `Already following User with id of ${req.params.id}`,
      });
    }
    userToFollow.followers.push(req.user.id);
    await userToFollow.save({ validateBeforeSave: false });

    // Update your following list
    const user = await User.findByIdAndUpdate(req.user._id, {
      $push: { following: userToFollow._id },
    });

    res.status(200).json({
      success: true,
      data: `Succesfully Followed user with the id of ${userToFollow._id}`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// * Search
router.post("/search", async (req, res) => {
  try {
    if (!req.query.name) {
      return res.status(400).json({ success: false });
    }
    const allUsers = await User.find({
      displayName: { $regex: req.query.name, $options: "i" },
    }).lean();

    res.status(200).json({
      success: true,
      data: allUsers,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

module.exports = router;
