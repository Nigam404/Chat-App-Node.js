const bcrypt = require("bcrypt");
const User = require("../model/userM");

exports.signup = async (req, res, next) => {
  const response = await User.findOne({ where: { mail: req.body.mail } });
  if (response) {
    res.status(400).json({ message: "User exist" });
  } else {
    const plainTextPassword = req.body.password;
    const saltRound = 10;
    bcrypt.hash(plainTextPassword, saltRound, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = await User.create({
          name: req.body.name,
          mail: req.body.mail,
          phone: req.body.phone,
          password: hash,
        });
        res.status(201).json(user);
        console.log("User data inserted successfully");
      }
    });
  }
};
