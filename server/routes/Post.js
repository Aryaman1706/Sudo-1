const express = require("express");
const router = express.Router();
const cloudinaryStorage = require("cloudinary-multer");
const isAuthenticated = require("../Middleware/isAuthenticated");
const User = require("../models/User");
const multer = require("multer");
const Post = require("../models/Post");
const Upvote = require("../models/Upvote");
const cloudinary = require("../config/cloudinary-config");

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("photo");

function checkFileType(file, cb) {
  // Make sure that the image is a photo
  if (!file.mimetype.startsWith("image")) {
    // return next(new ErrorResponse(`Please upload an image file`, 400));
    return cb("Error: Invalid file type.");
  }
  //Make sure the image is less than 4mb
  else if (file.size > 4000000) {
    return cb("Error: Invalid file size.");
  } else {
    return cb(null, true);
  }
}

// * Upload a Pic
router.post("/upload", [isAuthenticated, upload], async (req, res) => {
  try {
    // const result = await cloudinary.uploader.upload(req.file.path);
    let body = { ...req.body, photo: req.file.url };
    const newValue = { ...body, postedBy: req.user._id };
    const post = await Post.create(newValue);

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

router.get("/timeline", [isAuthenticated], async (req, res) => {
  try {
    // The following list of the current user
    const followingList = req.user.following;
    const posts = await Post.find({ postedBy: { $in: followingList } })
      .populate({
        path: "postedBy",
        select: "name photo email",
      })
      .populate({
        path: "upvotes",
        populate: {
          path: "likedBy",
          select: "name photo",
        },
      })
      .populate("totalUpvotes")
      .exec();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// * Get all posts
router.get("/explore", async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate({
        path: "postedBy",
        select: "displayName avatar_url",
      })
      .populate({
        path: "upvotes",
        populate: {
          path: "likedBy",
          select: "displayName avatar_url",
        },
      })
      .populate("totalUpvotes")
      .exec();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// * Get My Posts
router.get("/my-posts", [isAuthenticated], async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user.id })
      .populate({
        path: "postedBy",
        select: "name photo email",
      })
      .populate({
        path: "upvotes",
        populate: {
          path: "likedBy",
          select: "name photo",
        },
      })
      .populate("totalUpvotes")
      .exec();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// * Like a Post
router.post("/like/:id", [isAuthenticated], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) {
      return res.status(400).json({
        success: false,
        message: `Post with the id of ${req.params.id} doesn't exist`,
      });
    }
    // Check if the user has already liked the post
    const upvote = await Upvote.findOne({
      post: post._id,
      likedBy: req.user._id,
    }).lean();
    if (upvote) {
      return res
        .status(400)
        .json({ success: false, message: "Already liked the post" });
    }
    let body = { post: post._id, likedBy: req.user._id };

    const newLike = await Upvote.create(body);

    await User.findByIdAndUpdate(
      post.postedBy,
      { $inc: { points: 5 } },
      { runValidators: false }
    ).exec();

    res.status(200).json({
      success: true,
      data: newLike,
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
