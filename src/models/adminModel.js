const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    adminId: {
      type: String,
      
    },
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
    },

    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
      required : true,
    },
    confirmPassword : {
      type: String,
      required : true,
    },
    birthdayMessage: {
      type: String,
    }

  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
