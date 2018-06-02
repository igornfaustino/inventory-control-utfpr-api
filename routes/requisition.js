const express = require('express');
const router = express.Router();
const Requisition = require('../models/requisitionSchema');
const expressJoi = require('express-joi-validator');
const { ItemsRequisitionSchema } = require('../utils/validatorSchema');
const moment = require('moment');

const BodyValidation = {
	body: ItemsRequisitionSchema
}

moment().locale('pt-br');

/**
 * GET /api/requisitions/:id
 * use id to return one single requisition
 */
router.get('/requisition/:id', function (req, res) {
	const id = req.params.id;
	Requisition.getRequisitionById(id, function (err, requisition) {
		if (err) {
			return res.status(400).send(err);
		} else {
			res.json({ success: true, requisition: requisition });
		}
	});
});

/**
 * GET /api/requisitions/
 * return all requisitions
 */
router.get('/requisitions/', function (req, res) {
	Requisition.getAllRequisition(function (err, requisitions) {
		if (err) {
			res.status(400).send(err);
		} else {
			res.json({ success: true, requisitions: requisitions });
		}
	});
});

/**
 * POST /api/requisitions/
 * body:
 * {
 *		"siorg": "12345",
 *		"description": "blablabla",
 *		"justification": "blabla",
 *		"prices": [{
 *			"type": "url",
 *			"priceRef": "www.google.com"
 *		}],
 *		"qtd": 3
 * }
 */
router.post('/requisition/', expressJoi(BodyValidation), function (req, res) {
	let newRequisition = req.body
	if (!req.body.date) {
		newRequisition.date = moment().format('L')
	}
	if (!req.body.status) {
		newRequisition.status = 'pendente'
	}
	Requisition.addNewRequisition(newRequisition, function (err, requisition) {
		if (err) {
			res.status(400).json({ success: false, msg: 'Failed to add requisition', err: err });
		} else {
			res.json({ success: true, msg: 'requisition registered', requisition: requisition });
		}
	});
});

/**
 * PUT /api/requisition
 * body
 */
router.put('/requisition/:id', expressJoi(BodyValidation), function (req, res, next) {
	let updatedRequisition = req.body;
	updatedRequisition._id = req.params.id;

	Requisition.updateRequisition(updatedRequisition, function (err, requisition) {
		if (err) {
			res.json({ success: false, msg: 'Failed to update requisition' });
		} else {
			res.json({ success: true, msg: 'requisition updated', requisition: requisition });
		}
	});
});

/**
 * DELETE /api/requisition/:id
 */
router.delete('/requisition/:id', function (req, res, next) {
	var id = req.params.id;
	Requisition.deleteRequisition(id, function (err, requisition) {
		if (err) {
			res.json({ success: false, msg: 'Failed to delete requisition' });
		} else {
			res.json({ success: true, msg: 'Requisition deleted' });
		}
	});
});

module.exports = router;