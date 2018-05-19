const express = require('express');
const router = express.Router();
const Equipments = require('../models/equipmentSchema');
const expressJoi = require('express-joi-validator');
const moment = require('moment')
const { EquipmentSchema, EquipmentHitorySchema } = require('../utils/validatorSchema');

const BodyValidation = {
    body: EquipmentSchema
}

const BodyValidationHistory = {
    body: EquipmentHitorySchema
}

/**
 * GET /api/equipments/
 * return all equipments
 */
router.get('/equipments', function (req, res) {
    Equipments.getAllEquipments(function (err, equipments) {
        if (err) {
            res.status(400).send(err);
        }
        res.json({ success: true, equipments: equipments });
    });
});

/**
 * GET /api/equipment/:id
 * use id to return one single equipment
 */
router.get('/equipment/:id', function (req, res) {
    const id = req.params.id;
    Equipments.getEquipmentById(id, function (err, equipment) {
        if (err) {
            res.status(400).send(err);
        }
        res.json({ success: true, equipment: equipment });
    });
});


/**
 * POST /api/equipment/
 */
router.post('/equipment/', expressJoi(BodyValidation), function (req, res) {

    let newEquipment = req.body
    Equipments.addNewEquipment(newEquipment, function (err, equipment) {
        if (err) {
            //res.json(err);
            res.json({ success: false, msg: 'Failed to add equipment', err: err });
        } else {
            res.json({ success: true, msg: 'equipment added', equipment: equipment });
        }
    });
})

/**
 * UPDATE /api/equipment/
 */
router.put('/equipment/:id', expressJoi(BodyValidation), function (req, res) {
    let updatedEquipment = req.body
    updatedEquipment._id = req.params.id
    Equipments.updateEquipment(updatedEquipment, function (err, equipment) {
        if (err) {
            res.json({ success: false, msg: 'Failed to update equipment' });
        } else {
            res.json({ success: true, msg: 'equipment updated', result: equipment });
        }
    });
});

/**
 * DELETE /api/equipment/:id
 */
router.delete('/equipment/:id', function (req, res) {
    const id = req.params.id;
    Equipments.deleteEquipment(id, function (err, equipment) {
        if (err) {
            res.json({ success: false, msg: 'Failed to delete equipment' });
        } else {
            res.json({ success: true, msg: 'Equipment deleted', equipment: equipment })
        }
    })
});

router.post('/equipments/:id/move', expressJoi(BodyValidationHistory), function (req, res) {
    let newLocation = req.body;
    let equipmentId = req.params.id;
    console.log(equipmentId)
    newLocation.date = moment().format()
    Equipments.moveEquipment(equipmentId, newLocation, function (err, equipment) {
        if (err) {
            res.json({ success: false, msg: 'Failed to update equipment' });
        } else {
            res.json({ success: true, msg: 'equipment updated', result: equipment });
        }
    });
});

module.exports = router;