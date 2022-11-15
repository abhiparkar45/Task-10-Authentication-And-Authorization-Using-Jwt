const express = require("express");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const isMasterAdmin = require("../middlewares/isMasterAdmin");
const {
  newUser,
  getAllUsers,
  getCurrentUser,
  deleteUser,
} = require("../controllers/usersController");
const { userValidation } = require("../validations/userValidation");
const catchValidationError = require("../middlewares/catchValidationError");

const router = express.Router();

router.route("/register").post(userValidation, catchValidationError, newUser);
router.route("/getAllUsers").get(auth, isAdmin, getAllUsers);
router.route("/me").get(auth, getCurrentUser);
router
  .route("/admin/delete/:id")
  .delete(auth, isAdmin, isMasterAdmin, deleteUser);

module.exports = router;
