const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: [true, "Please upload a Photo"],
    },
    caption: {
      type: String,
      default: null,
      maxlength: 1000,
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

PostSchema.virtual("upvotes", {
  ref: "Upvote",
  localField: "_id",
  foreignField: "post",
});

PostSchema.virtual("totalUpvotes", {
  ref: "Upvote",
  localField: "_id",
  foreignField: "post",
  count: true,
});

module.exports = mongoose.model("Post", PostSchema);
