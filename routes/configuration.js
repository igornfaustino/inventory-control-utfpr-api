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

const passport = require('passport');
const { isAdmin } = require("../middleWares/isAdminMW");

// GET all status.
router.get('/status', passport.authenticate('jwt', { session: false }), function (req, res) {
    Status.getAllStatus((err, status) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({ success: true, status: status })
    })
});

// GET all type of itens.
router.get('/type', passport.authenticate('jwt', { session: false }), function (req, res) {
    Type.getAllTypeItems((err, type) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({ success: true, type: type })
    })
});

// GET all ugr of itens.
router.get('/ugr', passport.authenticate('jwt', { session: false }), function (req, res) {
    UGR.getAllUGR((err, ugr) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({ success: true, ugr: ugr })
    })
});

// GET all management of itens.
router.get('/management', passport.authenticate('jwt', { session: false }), function (req, res) {
    Management.getAllManagement((err, management) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({ success: true, management: management })
    })
});

// GET all type of itens.
router.get('/sector', passport.authenticate('jwt', { session: false }), function (req, res) {
    Sector.getAllSector((err, sector) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({ success: true, sector: sector })
    })
});

// add new status
router.post('/status', validator.body(statusValidation), passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    let newStatus = req.body;
    Status.addNewStatus(newStatus, (err, status) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(201).json({ success: true, msg: 'status added', status: status });
    })
});

// add new type
router.post('/type', validator.body(typeValidation), passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    let newType = req.body;
    Type.addNewTypeItem(newType, (err, type) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(201).json({ success: true, msg: 'type added', type: type });
    })
});

// add new type
router.post('/ugr', validator.body(ugrValidation), passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    let newUGR = req.body;
    UGR.addNewUGR(newUGR, (err, ugr) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(201).json({ success: true, msg: 'ugr added', ugr: ugr });
    })
});

// add new management
router.post('/management', validator.body(managementValidation), passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    let newManagement = req.body;
    Management.addNewManagement(newManagement, (err, management) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(201).json({ success: true, msg: 'management added', management: management });
    })
});

// add new sector
router.post('/sector', validator.body(sectorValidation), passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    let newSector = req.body;
    Sector.addNewSector(newSector, (err, sector) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(201).json({ success: true, msg: 'sector added', sector: sector });
    })
});

// ----------- Delete ------------

/**
 * DELETE sector
 */
router.delete('/sector/:id', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    const id = req.params.id;
    Sector.deleteSector(id, function (err) {
        if (err) {
            return res.json({ success: false, msg: 'Failed to delete sector' });
        }
        res.status(204).send()
    });
});

/**
 * DELETE /api/equipment/:id
 */
router.delete('/management/:id', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    const id = req.params.id;
    Management.deleteManagement(id, function (err) {
        if (err) {
            return res.json({ success: false, msg: 'Failed to delete Management' });
        }
        res.status(204).send()
    });
});

/**
 * DELETE /api/equipment/:id
 */
router.delete('/ugr/:id', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    const id = req.params.id;
    UGR.deleteUGR(id, function (err) {
        if (err) {
            return res.json({ success: false, msg: 'Failed to delete UGR' });
        }
        res.status(204).send()
    });
});

/**
 * DELETE /api/equipment/:id
 */
router.delete('/type/:id', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    const id = req.params.id;
    Type.deleteType(id, function (err) {
        if (err) {
            return res.json({ success: false, msg: 'Failed to delete type' });
        }
        res.status(204).send()
    });
});

/**
 * DELETE /api/equipment/:id
 */
router.delete('/status/:id', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    const id = req.params.id;
    Status.deleteStatus(id, function (err) {
        if (err) {
            return res.json({ success: false, msg: 'Failed to delete status' });
        }
        res.status(204).send()
    });
});

module.exports = router