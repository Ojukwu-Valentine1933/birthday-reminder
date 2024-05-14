const cron = require("node-cron");
const moment = require("moment");
const transporter = require("../helper/smtpServer");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

// Function to get admin email by ID
const getAdminEmailById = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId);
        return admin ? admin.email : null;
    } catch (error) {
        console.error("Error fetching admin email:", error);
        throw error;
    }
};

// Function to schedule reminder email
const scheduleReminder = (mailOptions, scheduleTime) => {
    const now = new Date();
    const delay = scheduleTime - now;
    setTimeout(async () => {
        try {
            await transporter.sendMail(mailOptions);
            console.log("Reminder email sent:", mailOptions.subject);
        } catch (error) {
            console.error("Error sending reminder email:", error);
        }
    }, delay);
};

// Main function to send birthday reminders
const sendBirthdayReminder = async () => {
    try {
        const today = moment().startOf('day');
        const oneMonthFromNow = moment().add(1, 'month').startOf('day');
        const oneDayFromNow = moment().add(1, 'day').startOf('day');
        const twoDaysFromNow = moment().add(2, 'days').startOf('day');

        // Find users with birthdays in one month and one day
        const users = await User.find({
            birthday: {
                $gte: today.toDate(),
                $lt: twoDaysFromNow.toDate(),
            },
        });

        for (const user of users) {
            const adminEmail = await getAdminEmailById(user.adminId);

            // 1-Month reminder
            if (moment(user.birthday).isSame(oneMonthFromNow, 'day')) {
                const mailOptionsOneMonth = {
                    from: adminEmail,
                    to: adminEmail,
                    subject: "1-Month Birthday Reminder",
                    text: `Don't forget, ${user.firstName}'s birthday is coming up in one month!`,
                    html: `<p>Don't forget, ${user.firstName}'s birthday is coming up in one month!</p>`,
                };
                transporter.sendMail(mailOptionsOneMonth).catch(error => {
                    console.error("Error sending 1-month reminder email:", error);
                });
            }

            // 1-Day reminder
            if (moment(user.birthday).isSame(oneDayFromNow, 'day')) {
                const mailOptionsOneDay = {
                    from: adminEmail,
                    to: adminEmail,
                    subject: "1-Day Birthday Reminder",
                    text: `Don't forget, ${user.firstName}'s birthday is tomorrow!`,
                    html: `<p>Don't forget, ${user.firstName}'s birthday is tomorrow!</p>`,
                };
                transporter.sendMail(mailOptionsOneDay).catch(error => {
                    console.error("Error sending 1-day reminder email:", error);
                });
            }

            // 1-Hour reminder
            const oneHourBeforeBirthday = moment(user.birthday).subtract(1, 'hour').toDate();
            const mailOptionsOneHour = {
                from: adminEmail,
                to: adminEmail,
                subject: "1-Hour Birthday Reminder",
                text: `Don't forget, ${user.firstName}'s birthday is in one hour!`,
                html: `<p>Don't forget, ${user.firstName}'s birthday is in one hour!</p>`,
            };
            scheduleReminder(mailOptionsOneHour, oneHourBeforeBirthday);
        }

        console.log("Birthday reminders processed successfully.");
    } catch (error) {
        console.error("Error sending birthday reminders:", error);
    }
};

// Schedule the sendBirthdayReminder function to run every day at 8:00 AM
cron.schedule("0 11 * * *", async () => {
    console.log("Running sendBirthdayReminder...");
    await sendBirthdayReminder();
});
sendBirthdayReminder()
module.exports = sendBirthdayReminder;