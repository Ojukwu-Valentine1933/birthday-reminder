const transporter = require("../helper/smtpServer");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

const sendBirthdayMessage = async (req, res) => {
    try {
        const { adminId, userId, birthdayMessage } = req.body;

        // Find the admin by ID
        const admin = await Admin.findById(adminId);

        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        // Use the admin's email to send the birthday message
        const adminEmail = admin.email;

        const user = await User.findById(userId);

        // Check if user is found
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Get user email and other information
        const userEmail = user.email;
        const userName = user.firstName; // Assuming firstName is a field in the User model

        // Prepare mail options
        const mailOptions = {
            from: adminEmail,
            to: userEmail, 
            subject: "Birthday Alert",
            text: birthdayMessage,
            html: `<h1>Hello ${userName},</h1><h1>${birthdayMessage} &#127874; &#127881;</h1>`,
        };

        // Send email
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return res.status(500).json({ error: "Birthday message not sent" });
            } else {
                return res.status(200).json({ message: "Birthday message sent successfully" });
            }
        });
    } catch (error) {
        console.error("Error sending birthday message:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = sendBirthdayMessage;

