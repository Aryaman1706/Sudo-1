const mongoose = require("mongoose");

const UpvoteSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likedOn: {
    type: Date,
    default: new Date(),
  },
});

UpvoteSchema.index({ post: 1, likedBy: 1 }, { unique: true });

module.exports = mongoose.model("Upvote", UpvoteSchema);
