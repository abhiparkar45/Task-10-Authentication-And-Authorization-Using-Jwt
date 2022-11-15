const db = require("../models/index");
const Users = db.Users;
const bcrypt = require("bcrypt");

exports.authenticateUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid Username or password !",
      });
    const matched = await bcrypt.compare(req.body.password, user.password);
    if (!matched) {
      res.status(400).json({
        success: false,
        message: "Invalid Username or password",
      });
    }

    const token = Users.generateAuthToken(
      user.dataValues.id,
      user.dataValues.email,
      user.dataValues.isAdmin
    );
    // console.log(token);
    res.status(200).json({
      token,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
