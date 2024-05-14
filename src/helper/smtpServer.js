const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const dotenv = require("dotenv")
dotenv.config()
const Oauth2 = google.auth.OAuth2;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const USER_EMAIL = process.env.USER_EMAIL;

const myOauth2Client = new Oauth2(CLIENT_ID, CLIENT_SECRET, "https://developers.google.com/oauthplayground");

myOauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: USER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN
    },
});

module.exports = transporter;






