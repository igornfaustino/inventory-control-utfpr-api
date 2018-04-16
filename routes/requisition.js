const express = require('express');
const router = express.Router();
const Requisition = require('../models/requisitionSchema');
const { check, validationResult } = require('express-validator/check');

// TODO: validate an array
const requisitionValidator = [
	check('siorg')
		.exists()
		.matches(/^(=?.*[A-Za-z\d$@$!%*?&])$/).withMessage('invalid characters')
		.optional(),
	check('description')
		.exists(),
	check('justification')
		.exists(),
	check('priceJustification')
		.exists()
		.optional(),
	check('qtd')
		.isInt()
		.toInt(),
];

/**
 * GET /api/requisitions/:id
 * use id to return one single requisition
 */
router.get('/requisition/:id', function (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ success: false, errors: errors.mapped() });
	}

	const id = req.params.id;
	Requisition.getRequisitionById(id, function (err, requisition) {
		if (err) {
			res.status(400).send(err);
		}
		res.json({ success: true, requisition: requisition });
	});
});

/**
 * GET /api/requisitions/
 * return all requisitions
 */
router.get('/requisition/', function (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ success: false, errors: errors.mapped() });
	}

	Requisition.getAllRequisition(function (err, requisitions) {
		if (err) {
			res.status(400).send(err);
		}
		res.json({ success: false, requisitions: requisitions });
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
router.post('/requisition/', requisitionValidator, function (req, res) {
	let newRequisition = {};
	newRequisition.siorg = req.body.siorg;
	newRequisition.description = req.body.description;
	newRequisition.justification = req.body.justification;
	newRequisition.prices = req.body.prices;
	newRequisition.priceJustification = req.body.priceJustification;
	newRequisition.qtd = req.body.qtd;

	Requisition.addNewRequisition(newRequisition, function (err, requisition) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ success: false, errors: errors.mapped() });
		}

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
router.put('/requisition/:id', requisitionValidator, function (req, res, next) {
	let updatedRequisition = {};
	updatedRequisition._id = req.params.id;
	updatedRequisition.siorg = req.body.siorg;
	updatedRequisition.description = req.body.description;
	updatedRequisition.justification = req.body.justification;
	updatedRequisition.prices = req.body.prices;
	updatedRequisition.priceJustification = req.body.priceJustification;
	updatedRequisition.qtd = req.body.qtd;

	Requisition.updateRequisition(updatedRequisition, function (err, requisition) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ sucesso: false, errors: errors.mapped() });
		}

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
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ sucesso: false, errors: errors.mapped() });
	}

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