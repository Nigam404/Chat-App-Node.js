const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const sequelize = require("./utils/database");
const userRouter = require("./router/userR");

const app = express();

//middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//routes
app.use(userRouter);

//server
sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
