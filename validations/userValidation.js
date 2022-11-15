const { body } = require("express-validator");

exports.userValidation = [
  body("username")
    .notEmpty()
    .withMessage("username is required !")
    .isLength({ min: 5, max: 12 })
    .withMessage(
      "username should be minimum of 5 character and maximum 12 character long !"
    ),
  body("email").isEmail().withMessage("Invalid Email !"),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required !")
    .isLength({ min: 10, max: 10 })
    .withMessage("Invalid Phone Number !")
    .custom((val) => !isNaN(val))
    .withMessage("Invalid Phone Number !"),
  body("password")
    .notEmpty()
    .withMessage("Password is required !")
    .isStrongPassword()
    .withMessage(
      "Password must contain a Upper character, lower character, number and special character !"
    ),
];
