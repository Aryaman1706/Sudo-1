const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

// * Models
const User = require("../models/User");

// * Passport github strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.PASSPORT_REDIRECT_URI}`,
      scope: "user:email",
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await User.findOne({ githubId: profile.id });
      // console.log(profile);
      if (user) {
        return done(null, user);
      }
      console.log(profile);
      const newUser = new User({
        displayName: profile.displayName,
        username: profile.username,
        email: profile.emails[0].value,
        githubId: profile.id,
        avatar_url: profile._json.avatar_url,
        bio: profile._json.bio,
      });
      await newUser.save();
      done(null, newUser);
    }
  )
);

// * Passport serializeUser
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// * Passport deserializeUser
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
