const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplierSchema');
const expressJoi = require('express-joi-validator');
const moment = require('moment')
const { SupplierSchema } = require('../utils/validatorSchema');

const BodyValidation = {
    body: SupplierSchema
}

/**
 * GET /api/suppliers/
 * return all suppliers
 */
router.get('/suppliers', function (req, res) {
    Supplier.getAllSuppliers(function (err, suppliers) {
        if (err) {
            res.status(400).send(err);
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
            res.status(400).send(err);
        }
        res.json({ success: true, supplier: supplier });
    });
});


/**
 * POST /api/supplier/
 */
router.post('/supplier/', expressJoi(BodyValidation), function (req, res) {

    let newSupplier = req.body
    Supplier.addNewSupplier(newSupplier, function (err, supplier) {
        if (err) {
            //res.json(err);
            res.json({ success: false, msg: 'Failed to add supplier', err: err });
        } else {
            res.json({ success: true, msg: 'supplier added', supplier: supplier });
        }
    });
})

/**
 * UPDATE /api/supplier/
 */
router.put('/supplier/:id', expressJoi(BodyValidation), function (req, res) {
    let updatedSupplier = req.body
    updatedSupplier._id = req.params.id
    Supplier.updateSupplier(updatedSupplier, function (err, result) {
        if (err) {
            res.json({ success: false, msg: 'Failed to update supplier' });
        } else {
            res.json({ success: true, msg: 'supplier updated', result: result });
        }
    });
});

/**
 * DELETE /api/supplier/:id
 */
router.delete('/supplier/:id', function (req, res) {
    const id = req.params.id;
    Supplier.deleteSupplier(id, function (err, result) {
        if (err) {
            res.json({ success: false, msg: 'Failed to delete supplier' });
        } else {
            res.json({ success: true, msg: 'supplier deleted', result: result })
        }
    })
});

module.exports = router;