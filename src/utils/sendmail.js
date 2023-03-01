const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
});
const sendmail = (mailOptions) => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) console.log("[ERROR WHILE SENDING MAIL !]", error); else console.log("[MAIL SUCCESSFULLY SENT !]", info.response);
    });
}

module.exports = {sendmail};
