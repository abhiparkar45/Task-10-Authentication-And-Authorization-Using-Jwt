const db = require("../models/index");
const Users = db.Users;
const bcrypt = require("bcrypt");

exports.newUser = async (req, res, next) => {
  try {
    const user = await req.body;
    const isUsernameInDB = await Users.findOne({
      where: { username: user.username },
    });
    if (isUsernameInDB) {
      return res
        .status(400)
        .json({ success: false, message: "Username is not available !" });
    }
    const isEmailInDB = await Users.findOne({ where: { email: user.email } });
    if (isEmailInDB) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already registered !" });
    }
    const isPhoneInDB = await Users.findOne({ where: { phone: user.phone } });
    if (isPhoneInDB) {
      return res.status(400).json({
        success: false,
        message: "Phone number is already registered !",
      });
    }
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const result = await Users.create(user);

    res.status(201).json({
      sucess: true,
      message: "User Registered SuccessFully !",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const x = await req.user;
    const user = await Users.findOne({
      where: { id: req.user.id },
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found !",
      });
    }
    if (req.user.email === user.email) {
      return res
        .status(400)
        .json({ success: false, message: "you cannot delete master admin !" });
    }
    const deletedUser = await Users.destroy({ where: { id: req.params.id } });
    if (deletedUser) {
      return res.status(200).json({
        success: true,
        message: "User Deleted Successfully !",
        deletedUser: user,
      });
    }
  } catch (err) {
    next(err);
  }
};
