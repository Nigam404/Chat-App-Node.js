const express = require("express");
const router = express.Router();

const groupController = require("../controller/groupC");
const userAuthentication = require("../middleware/authentication");

router.get(
  "/group/getgroup",
  userAuthentication.authenticate,
  groupController.getGroup
);
router.get("/group/getmembers/:GROUPID", groupController.getMembers);
router.post(
  "/group/create",
  userAuthentication.authenticate,
  groupController.createGroup
);
router.post("/group/addmember/:GROUPID", groupController.addMember);

module.exports = router;
