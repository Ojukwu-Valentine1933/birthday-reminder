const express = require("express");
const userRouter = express.Router();

const {createNewUser, userLogin} = require("../controller/userController");


userRouter.post("/", createNewUser);
userRouter.post("/login", userLogin);


module.exports = userRouter;