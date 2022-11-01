const express = require("express");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin")
const {newUser, getAllUsers, getCurrentUser, deleteUser} = require('../controllers/usersController');

const router = express.Router();

router.route("/register").post(newUser);
router.route("/getAllUsers").get(auth,getAllUsers);
router.route("/me").get(auth,getCurrentUser);
router.route("/admin/delete/:id").delete(auth,isAdmin,deleteUser);

module.exports = router;