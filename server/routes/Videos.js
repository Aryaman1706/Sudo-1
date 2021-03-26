const express = require("express");
const router = express.Router();
const cloudinaryStorage = require("cloudinary-multer");
const isAuthenticated = require("../Middleware/isAuthenticated");
const User = require("../models/User");
const multer = require("multer");
const Post = require("../models/Post");
const Upvote = require("../models/Upvote");
const cloudinary = require("../config/cloudinary-config");
const Video = require("../models/Video");
const Joi = require("joi");

const validator = (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
  });
  const { error } = schema.validate(body);
  if (error) return error;
  return false;
};

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  // validator: validator,
  uploadOptions: {
    resource_type: "auto",
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("video");

function checkFileType(file, cb) {
  // Make sure that the image is a photo
  //   if (!file.mimetype.startsWith("video")) {
  //     // return next(new ErrorResponse(`Please upload an image file`, 400));
  //     return cb("Error: Invalid file type.");
  //   }
  //Make sure the video is less than 100mb
  if (file.size > 100000000) {
    return cb("Error: Invalid file size.");
  } else {
    return cb(null, true);
  }
}

// * Upload a Video
router.post("/upload", [isAuthenticated, upload], async (req, res) => {
  try {
    // const result = await cloudinary.uploader.upload(req.file.path);
    console.log(req.file, "file");
    let body = { ...req.body, video: req.file.url };
    const newValue = { ...body, postedBy: req.user._id };
    const video = await Video.create(newValue);

    res.status(200).json({
      success: true,
      data: video,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// * Get all Videos
router.get("/explore", async (req, res) => {
  try {
    const videos = await Video.find({})
      .populate({
        path: "postedBy",
        select: "displayName avatar_url",
      })
      .exec();

    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// * Get My Videos
router.get("/my-videos", [isAuthenticated], async (req, res) => {
  try {
    const videos = await Video.find({ postedBy: req.user.id })
      .populate({
        path: "postedBy",
        select: "name photo email",
      })
      .exec();

    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// * Get a Video by id
router.get("/view/:id", [isAuthenticated], async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate({
        path: "postedBy",
        select: "displayName avatar_url",
      })
      .exec();
    video.views++;
    await video.save();
    res.status(200).json({
      success: true,
      data: video,
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
