const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    video: {
      type: String,
      required: [true, "Please upload a Video"],
    },
    title: {
      type: String,
      required: [true, "Please add a video title"],
    },
    description: {
      type: String,
      default: null,
      maxlength: 1000,
    },
    views: {
      type: Number,
      default: 0,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postedOn: {
      type: Date,
      default: new Date(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Video", VideoSchema);
