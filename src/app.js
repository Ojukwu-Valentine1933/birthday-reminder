//this file is configuration and importation of all dependecies and importation of all route

const express = require("express");
const cors = require("cors");
const app = express();
const cron = require('node-cron');
const userRouter = require("./route/userRoute");
const adminRouter = require("./route/adminRoute");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

const sendBirthdayReminder = require("./utils/adminReminder")

app.use("/users", userRouter);
app.use("/admin", adminRouter);

module.exports = app;
