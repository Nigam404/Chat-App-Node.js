const express = require("express");
const router = express.Router();

const userAuthentication = require("../middleware/authentication");
const messageController = require("../controller/messageC");

router.post(
  "/message/save",
  userAuthentication.authenticate,
  messageController.saveMsg
);

module.exports = router;
