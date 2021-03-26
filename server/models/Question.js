const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const answerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    markdown: {
      type: String,
      required: true,
    },
    voted: {
      users: [
        {
          _id: false,
          user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
          upVoted: { type: Boolean },
        },
      ],
    },
    votes: {
      type: Number,
      default: 0,
    },
    // downVotes: {
    //   type: Number,
    //   default: 0,
    // },
    comments: [commentSchema],
  },
  { timestamps: true }
);
const questionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    markdown: {
      type: String,
      required: true,
    },
    voted: {
      users: [
        {
          _id: false,
          user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
          upVoted: { type: Boolean },
        },
      ],
    },
    // upVotes: {
    //   type: Number,
    //   default: 0,
    // },
    votes: {
      type: Number,
      default: 0,
    },
    // downVotes: {
    //   type: Number,
    //   default: 0,
    // },
    comments: [commentSchema],
    tags: [{ type: mongoose.Schema.Types.ObjectID, ref: "Tag" }],
    answers: [answerSchema],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
// questionSchema.index({ data: "text", tags: "text" });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
