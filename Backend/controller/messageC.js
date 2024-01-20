const Message = require("../model/messageM");
const User = require("../model/userM");

//............................................................................................
exports.saveMsg = async (req, res, next) => {
  console.log("Inside saveMsg-User Id->", req.USERID);
  //getting username through userid.
  const user = await User.findByPk(req.USERID);

  //creating row in DB
  const response = await Message.create({
    message: req.body.message,
    userId: req.USERID,
    userName: user.name,
  });
  res.status(201).json(response);
};

//...........................................................................................
exports.getMsg = async (req, res, next) => {
  const message = await Message.findAll();
  if (message.length > 0) {
    res.status(200).json(message);
  } else {
    res.json([]);
  }
};
