const express = require('express');
const router = express.Router();
const Equipments = require('../models/equipmentSchema');
const Joi = require('joi');
const validator = require('express-joi-validation')({});
const moment = require('moment')
const { EquipmentSchema, EquipmentHitorySchema } = require('../utils/validatorSchema');
const passport = require('passport');
const { isAdmin } = require("../middleWares/isAdminMW");

const BodyValidation = Joi.object(EquipmentSchema);

const BodyValidationHistory = Joi.object(EquipmentHitorySchema);

/**
 * GET /api/equipments/
 * return all equipments
 */
router.get('/equipments', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    Equipments.getAllEquipments(function (err, equipments) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).json({ success: true, equipments: equipments });
    });
});

/**
 * GET /api/equipment/:id
 * use id to return one single equipment
 */
router.get('/equipment/:id', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    const id = req.params.id;
    Equipments.getEquipmentById(id, function (err, equipment) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).json({ success: true, equipment: equipment });
    });
});


/**
 * POST /api/equipment/
 */
router.post('/equipment/', validator.body(BodyValidation), passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {

    let newEquipment = req.body
    Equipments.addNewEquipment(newEquipment, function (err, equipment) {
        if (err) {
            //res.json(err);
            return res.json({ success: false, msg: 'Failed to add equipment', err: err });
        }
        res.status(201).json({ success: true, msg: 'equipment added', equipment: equipment });
    });
})

/**
 * UPDATE /api/equipment/
 */
router.put('/equipment/', validator.body(BodyValidation), passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    let updatedEquipment = req.body
    Equipments.updateEquipment(updatedEquipment, function (err, equipment) {
        if (err) {
            return res.json({ success: false, msg: 'Failed to update equipment' });
        }
        res.status(200).json({ success: true, msg: 'equipment updated', result: equipment });
    });
});

/**
 * DELETE /api/equipment/:id
 */
router.delete('/equipment/:id', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    const id = req.params.id;
    Equipments.deleteEquipment(id, function (err, equipment) {
        if (err) {
            return res.json({ success: false, msg: 'Failed to delete equipment' });
        }
        res.status(204).send()
    });
});

router.post('/equipments/:id/move', validator.body(BodyValidationHistory), passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    let newLocation = req.body;
    let equipmentId = req.params.id;
    console.log(equipmentId)
    newLocation.date = moment().format()
    Equipments.moveEquipment(equipmentId, newLocation, function (err, equipment) {
        if (err) {
            res.json({ success: false, msg: 'Failed to update equipment' });
        }
        res.json({ success: true, msg: 'equipment updated', result: equipment });
    });
});

module.exports = router;