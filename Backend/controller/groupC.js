const Group = require("../model/groupM");
const User = require("../model/userM");

//.......................................................................................
exports.createGroup = async (req, res, next) => {
  //creating group
  const group = await Group.create({
    name: req.body.name,
  });
  //adding admin/who created group in the group
  const user = await User.findByPk(req.USERID);

  await group.addUsers(user);

  res.status(201).json(group);
};


//.......................................................................................
exports.getGroup = async (req, res, next) => {
  const user = await User.findByPk(req.USERID);
  const groups = await user.getGroups();
  const groups2 = await Group.findAll();
  res.status(200).json(groups);
};

//........................................................................................
exports.getMembers = async (req, res, next) => {
  const group = await Group.findByPk(req.params.GROUPID);
  const users = await group.getUsers();
  console.log(users);
  res.status(200).json(users);
};

//........................................................................................
exports.addMember = async (req, res, next) => {
  const group_id = req.params.GROUPID;
  const user_id = req.body.memberid;
  const group = await Group.findByPk(group_id);
  const user = await User.findByPk(user_id);
  await group.addUsers(user);
  res.json({ message: "successful" });
};
