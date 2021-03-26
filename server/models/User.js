const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    displayName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    githubId: { type: String, required: true },
    avatar_url: { type: String, required: true },
    bio: { type: String },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("stars").get(function () {
  if (this.points >= 50) {
    return 1;
  } else if (this.points >= 100) {
    return 2;
  } else if (this.points >= 150) {
    return 3;
  } else if (this.points >= 200) {
    return 4;
  } else if (this.points >= 250) {
    return 5;
  } else if (this.points < 50) {
    return 0;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
