const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchaseSchema');
const Joi = require('joi');
const validator = require('express-joi-validation')({});
const { PriceSchema, SupplierSchema, ItemsRequisitionSchema, PurchaseRequisitionSchema } = require('../utils/validatorSchema');

const BodyValidation = Joi.object(PurchaseRequisitionSchema);

/**
 * GET /api/purchase/
 * return all purchases
 */
router.get('/purchase/', function (req, res) {
    Purchase.getAllPurchases(function (err, purchases) {
        if (err) {
            res.status(400).send(err);
        }
        res.json({ success: true, purchases: purchases });
    });
});

/**
 * GET /api/purchase/:id
 * use id to return one single purchase
 */
router.get('/purchase/:id', function (req, res) {
    const id = req.params.id;
    Purchase.getPurchaseById(id, function (err, purchase) {
        if (err) {
            res.status(400).send(err);
        }
        res.json({ success: true, purchase: purchase });
    });
});

/**
 * GET /api/purchase/itens/:id
 * use id to return all itens from a single purchase
 */
router.get('/purchase/items/:id', function (req, res) {
    const id = req.params.id;
    Purchase.getAllItens(id, function (err, items) {
        if (err) {
            res.status(400).send(err);
        }
        res.json({ success: true, items: items });
    });
});

/**
 * POST /api/purchase/
 */
router.post('/purchase/', validator.body(BodyValidation), function (req, res) {
    let newPurchase = req.body
    Purchase.addNewPurchase(newPurchase, function (err, purchase) {
        if (err) {
            //res.json(err);
            res.json({ success: false, msg: 'Failed to add purchase', err: err });
        } else {
            res.json({ success: true, msg: 'Purchase added', purchase: purchase });
        }
    });
})

/**
 * UPDATE /api/purchase/
 */
router.put('/purchase/:id', validator.body(BodyValidation), function (req, res) {
    let updatedPurchase = req.body
    updatedPurchase.id = req.params.id
    Purchase.updatePurchase(updatedPurchase, function (err, purchase) {
        if (err) {
            res.json({ success: false, msg: 'Failed to update purchase' });
        } else {
            res.json({ success: true, msg: 'Purchase updated', purchase: purchase });
        }
    });
});

/**
 * DELETE /api/purchase/:id
 */
router.delete('/purchase/:id', function (req, res) {
    const id = req.params.id;
    Purchase.deletePurchase(id, function (err, purchase) {
        if (err) {
            res.json({ success: false, msg: 'Failed to delete purchase' });
        } else {
            res.json({ success: true, msg: 'Purchase deleted', purchase: purchase })
        }
    })
});

module.exports = router;