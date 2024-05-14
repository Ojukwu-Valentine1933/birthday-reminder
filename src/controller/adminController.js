const Admin = require("../models/adminModel");
const generateRandomToken = require("../utils/tokenHelper");
const transporter = require("../helper/smtpServer");
const hashPassword = require("../utils/passwordEncryptor");



// Assuming you have exported the Nodemailer transporter from a separate file

const createNewAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const verificationToken = await generateRandomToken(32);
    const hashedPassword = await hashPassword(password);

    const admin = new Admin({ firstName, lastName, email, password : hashPassword, verificationToken, confirmPassword});
   

    const savedAdmin = await admin.save();

    if (!savedAdmin) {
      return res.status(400).json({ error: "Failed to create admin" });
    }

    // Send email with verification token
    const mailOptions = {
      from: "jasperojukwu2@gmail.com",
      to: email,
      subject: "Verification Token",
      text: `Your verification token is: ${verificationToken}`,
      html: `<p>Your verification token is: <b>${verificationToken}</b></p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(500).json({ error: "Email not Sent" });
        // Handle error response
      } 
    });

    return res
      .status(201)
      .json({ message: "Admin created successfully Check your Email to confirm Verification", admin: savedAdmin });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const newAdminVerification = async (req, res) => {
  const { verificationToken} = req.body;
  const admin = await Admin.findOne({ verificationToken});

  if (!admin) {
    return res.status(400).json({ error: "Invalid Token" });
    
  } 
  admin.isVerified = true;
  admin.verificationToken = undefined;
  await admin.save();
  
    return res.status(200).json({ message: "Admin verified"});

};





const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({email, password});
  if (!admin) {
    return res.status(400).json({ error: "Invalid Email or Password" });
  }
  return res.status(200).json({ message: "Login Successful"})
}




module.exports = { createNewAdmin, newAdminVerification, adminLogin};
