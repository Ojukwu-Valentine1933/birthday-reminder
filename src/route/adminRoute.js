const express = require("express");
const adminRouter = express.Router();

const {createNewAdmin, newAdminVerification, adminLogin} = require("../controller/adminController");
const sendBirthdayMessage = require("../services/adminServices")



adminRouter.post("/", createNewAdmin);
adminRouter.put("/verify", newAdminVerification);
adminRouter.post("/login", adminLogin)
adminRouter.post("/sendBirthdayMessage", sendBirthdayMessage)




module.exports = adminRouter;