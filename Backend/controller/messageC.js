const Message = require("../model/messageM");
exports.saveMsg = async (req, res, next) => {
  console.log("Inside saveMsg-User Id->", req.USERID);
  const response = await Message.create({
    message: req.body.message,
    userId: req.USERID,
  });
  res.status(201).json(response);
};
