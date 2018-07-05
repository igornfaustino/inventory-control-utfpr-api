var express = require('express');
var router = express.Router();

const { transporter } = require("../utils/sendEmail");
const Requisition = require('../models/requisitionSchema');

router.post('/email/send', function (req, res) {
	transporter.sendMail({
		from: '"No Reply" <'+ mail +'>', // sender address
		to: req.body.to, // list of receivers
		subject: req.body.subject, // Subject line
		text: req.body.text, // plain text body
	}, (error, info) => {
		if (error) {
			return console.log(error);
		}
		res.status(200).send('Message %s sent: %s', info.messageId, info.response);
	});
});

router.post('/email/send/:item', function (req, res) {
	const id = req.params.item;
	Requisition.getRequisitionById(id, function (err, requisition) {
		if (err) {
			return res.status(400).send(err);
		}
		if (requisition) {
			transporter.sendMail({
				from: '"No Reply" <'+ mail +'>', // sender address
				to: requisition.requesterId.email, // list of receivers
				subject: req.body.subject, // Subject line
				text: req.body.text + "\nDetalhes do item:\n" + requisition.description, // plain text body
			}, (error, info) => {
				if (error) {
					return console.log(error);
				}
				res.status(200).send('Message %s sent: %s', info.messageId, info.response);
			});
		}
	});
});

module.exports = router;