const User = require("../models/userModel");
const hashPassword = require("../utils/passwordEncryptor");

const createNewUser = async (req, res) => {
  try {
    const { firstName, lastName, email, birthday, password, confirmPassword } =
      req.body;

    // Hash the plaintext password
    const hashedPassword = await hashPassword(password);

    // Create a new user instance with the hashed password
    const user = new User({
      firstName,
      lastName,
      email,
      birthday,
      password: hashedPassword,
      confirmPassword
    });

    // Save the user to the database
    const savedUser = await user.save();

    if (!savedUser) {
      return res.status(400).json({ error: "Failed to create user" });
    }

    return res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email, password });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "Login Sucessfully" });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {createNewUser, userLogin};
