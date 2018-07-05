const nodemailer = require('nodemailer');
const config = require('../config/emailConfig')

const transporter = nodemailer.createTransport(config.nodemailerConfig);
module.exports = {
	transporter,
	mail: config.mail
}
