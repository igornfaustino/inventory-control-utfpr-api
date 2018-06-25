const express = require('express');
const router = express.Router();

const Status = require('../models/statusSchema');
const Type = require('../models/typeItemSchema');
const UGR = require('../models/ugrSchema');
const Management = require('../models/managementSchema');
const Sector = require('../models/sectorSchema');

const Joi = require('joi');
const validator = require('express-joi-validation')({});
const { StatusSchema, TypeSchema, UGRSchema, ManagementSchema, SectorSchema } = require('../utils/validatorSchema');

const statusValidation = Joi.object(StatusSchema);
const typeValidation = Joi.object(TypeSchema)
const ugrValidation = Joi.object(UGRSchema)
const managementValidation = Joi.object(ManagementSchema)
const sectorValidation = Joi.object(SectorSchema)

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

// GET all ugr of itens.
router.get('/ugr', function (req, res) {
    UGR.getAllUGR((err, ugr) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({ success: true, ugr: ugr })
    })
});

// GET all management of itens.
router.get('/management', function (req, res) {
    Management.getAllManagement((err, management) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({ success: true, management: management })
    })
});

// GET all type of itens.
router.get('/sector', function (req, res) {
    Sector.getAllSector((err, sector) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({ success: true, sector: sector })
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

// add new type
router.post('/ugr', validator.body(ugrValidation), function (req, res) {
    let newUGR = req.body;
    UGR.addNewUGR(newUGR, (err, ugr) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(201).json({ success: true, msg: 'ugr added', ugr: ugr });
    })
});

// add new management
router.post('/management', validator.body(managementValidation), function (req, res) {
    let newManagement = req.body;
    Management.addNewManagement(newManagement, (err, management) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(201).json({ success: true, msg: 'management added', management: management });
    })
});

// add new sector
router.post('/sector', validator.body(sectorValidation), function (req, res) {
    let newSector = req.body;
    Sector.addNewSector(newSector, (err, sector) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(201).json({ success: true, msg: 'sector added', sector: sector });
    })
});

module.exports = router