const express = require("express");
const router = express.Router();

const userController = require("../controller/userC");

router.post("/user/signup", userController.signup);

module.exports = router;
