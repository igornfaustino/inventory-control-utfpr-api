const express = require('express');
const router = express.Router();
const Status = require('../models/statusSchema');
const Type = require('../models/typeItemSchema');
const Joi = require('joi');
const validator = require('express-joi-validation')({});
const { StatusSchema, TypeSchema } = require('../utils/validatorSchema');

const statusValidation = Joi.object(StatusSchema);
const typeValidation = Joi.object(TypeSchema)

// GET all status.
router.get('/status', function (req, res) {
    Status.getAllStatus((err, status) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({ success: true, status: status })
    })
});

// GET all type of itens.
router.get('/type', function (req, res) {
    Type.getAllTypeItems((err, type) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({ success: true, type: type })
    })
});

// add new status
router.post('/status', validator.body(statusValidation), function (req, res) {
    let newStatus = req.body;
    Status.addNewStatus(newStatus, (err, status) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(201).json({ success: true, msg: 'status added', status: status });
    })
});

// add new type
router.post('/type', validator.body(typeValidation), function (req, res) {
    let newType = req.body;
    Type.addNewTypeItem(newType, (err, type) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(201).json({ success: true, msg: 'type added', type: type });
    })
});

module.exports = router