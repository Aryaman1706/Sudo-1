const express = require("express");
const router = express.Router();
const passport = require("passport");

// * Login or Register
router.get(
  "/login",
  passport.authenticate("github", {
    scope: ["user:email", "read:user", "public_repo"],
  })
);

// * Callback uri for github login
router.get("/login/callback", (req, res, next) => {
  passport.authenticate(
    "github",
    { scope: ["user:email", "read:user", "public_repo"] },
    function (err, user, info) {
      if (!user)
        return res.status(400).send({ err: info, msg: "something went wrong" });

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        return res.redirect(`${process.env.CLIENT_URL}/home`);
      });
    }
  )(req, res, next);
});

// * Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(`${process.env.CLIENT_URL}`);
});

module.exports = router;
