const express = require("express");
const {authenticateUser} = require('../controllers/authController');

const router = express.Router();

router.route("/auth").post(authenticateUser);
module.exports = router;