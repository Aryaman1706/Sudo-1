module.exports = async (req, res, next) => {
  const adminPass = req.header("x-admin-auth");
  if (adminPass !== process.env.ADMIN_PASSWORD)
    return res.status(400).send("invalid admin password");
  next();
};
