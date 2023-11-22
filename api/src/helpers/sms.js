const nodemailer = require("nodemailer");
const emailConfig = require("../config/email");

const send = (phoneNumber, txtBody) => {
    return new Promise((resolve, reject) => {
        console.log(txtBody);
        return resolve(true);
    });
};

module.exports = {
    send,
};
