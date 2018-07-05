const nodemailer = require('nodemailer');
const config = require('../config/emailConfig')

const transporter = nodemailer.createTransport(config);
module.exports = {
	transporter,
	mail: 'faustino.dev@gmail.com'
}
