const express = require('express');
const router = express.Router();
const Requisition = require('../models/requisitionSchema');
const Purchase = require('../models/purchaseSchema');
const Joi = require('joi');
const validator = require('express-joi-validation')({});
const {ItemsRequisitionSchema} = require('../utils/validatorSchema');
const moment = require('moment');
const passport = require('passport');
const {isAdmin} = require("../middleWares/isAdminMW");

const {transporter, mail} = require("../utils/sendEmail")

const BodyValidation = Joi.object(ItemsRequisitionSchema);

moment().locale('pt-br');

/**
 * GET /api/requisitions/:id
 * use id to return one single requisition
 */
router.get('/requisition/:id', passport.authenticate('jwt', {session: false}), function (req, res) {
    const id = req.params.id;
    Requisition.getRequisitionById(id, function (err, requisition) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).json({success: true, requisition: requisition});
    });
});

/**
 * GET /api/requisitions/
 * return all requisitions
 */
router.get('/requisitions/', passport.authenticate('jwt', {session: false}), function (req, res) {
    Requisition.getAllRequisition(function (err, requisitions) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).json({success: true, requisitions: requisitions});

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
router.post('/requisition/', validator.body(BodyValidation), passport.authenticate('jwt', {session: false}), function (req, res) {
    let newRequisition = req.body

    console.log(newRequisition)

    if (!req.body.date) {
        newRequisition.date = moment().format('L')
    }
    if (!req.body.status) {
        newRequisition.status = 'Aberto'
    }
    Requisition.addNewRequisition(newRequisition, function (err, requisition) {
        if (err) {
            return res.status(400).json({success: false, msg: 'Failed to add requisition', err: err});
        }
        res.status(201).json({success: true, msg: 'requisition registered', requisition: requisition});
    });
});

/**
 * PUT /api/requisition
 * body
 */
router.put('/requisition/', validator.body(BodyValidation), passport.authenticate('jwt', {session: false}), isAdmin, function (req, res, next) {
    let updatedRequisition = req.body;
    // updatedRequisition._id = req.params.id;

    // console.log(updatedRequisition);

    Requisition.updateRequisition(updatedRequisition, function (err, requisition) {
        if (err) {
            return res.status(400).json({success: false, msg: 'Failed to update requisition'});
        }
        res.status(200).json({success: true, msg: 'requisition updated', requisition: requisition});
        // transporter.sendMail({
        // 	from: '"No Reply" <' + mail + '>', // sender address
        // 	to: requisition.requesterId.email, // list of receivers
        // 	subject: "Mudança na sua requisição", // Subject line
        // 	text: "Sua requisição foi modificada com a seguinte justificativa: " + updatedRequisition.changeJustification, // plain text body
        // }, (error, info) => {
        // 	if (error) {
        // 		return console.log(error);
        // 	}
        // 	console.log('Message %s sent: %s', info.messageId, info.response);
        // });
    });
});

/**
 * DELETE /api/requisition/:id
 */
router.delete('/requisition/:id', passport.authenticate('jwt', {session: false}), isAdmin, function (req, res, next) {
    var id = req.params.id;
    Purchase.getItem(id, function (err, item) {
        if (item.length > 0) {
            return res.status(200).json({success: false, msg: 'Requisition do not removed, because it´s in a buy'})
        }
        else {
            Requisition.deleteRequisition(id, function (err, requisition) {
                console.log(item);
                if (err) {
                    return res.status(400).json({success: false, msg: 'Failed to delete requisition'});
                }
                return res.status(200).json({success: true, msg: 'Success to delete requisition'})
            });
        }
    })

});

module.exports = router;