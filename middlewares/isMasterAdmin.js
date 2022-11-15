module.exports = async (req, res, next) => {
  if (req.user.email === "masteradmin@gmail.com") {
    return next();
  }
  return res.status(403).json({ success: false, message: "forbidden !" });
};
