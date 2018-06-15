const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplierSchema');
const Joi = require('joi');
const validator = require('express-joi-validation')({});
const moment = require('moment')
const { SupplierSchema } = require('../utils/validatorSchema');

const BodyValidation = Joi.object(SupplierSchema);

/**
 * GET /api/suppliers/
 * return all suppliers
 */
router.get('/suppliers', function (req, res) {
    Supplier.getAllSuppliers(function (err, suppliers) {
        if (err) {
            return res.status(400).send(err);
        }
        res.json({ success: true, suppliers: suppliers });
    });
});

/**
 * GET /api/supplier/:id
 * use id to return one single supplier
 */
router.get('/supplier/:id', function (req, res) {
    const id = req.params.id;
    Supplier.getSupplierById(id, function (err, supplier) {
        if (err) {
            return res.status(400).send(err);
        }
        res.json({ success: true, supplier: supplier });
    });
});


/**
 * POST /api/supplier/
 */
router.post('/supplier/', validator.body(BodyValidation), function (req, res) {

    let newSupplier = req.body
    Supplier.addNewSupplier(newSupplier, function (err, supplier) {
        if (err) {
            //res.json(err);
            return res.json({ success: false, msg: 'Failed to add supplier', err: err });
        }
        res.json({ success: true, msg: 'supplier added', supplier: supplier });
    });
})

/**
 * UPDATE /api/supplier/
 */
router.put('/supplier/:id', validator.body(BodyValidation), function (req, res) {
    let updatedSupplier = req.body
    updatedSupplier._id = req.params.id
    Supplier.updateSupplier(updatedSupplier, function (err, result) {
        if (err) {
            return res.json({ success: false, msg: 'Failed to update supplier' });
        }
        res.json({ success: true, msg: 'supplier updated', result: result });
    });
});

/**
 * DELETE /api/supplier/:id
 */
router.delete('/supplier/:id', function (req, res) {
    const id = req.params.id;
    Supplier.deleteSupplier(id, function (err, result) {
        if (err) {
            return res.json({ success: false, msg: 'Failed to delete supplier' });
        }
        res.json({ success: true, msg: 'supplier deleted', result: result })
    })
});

module.exports = router;