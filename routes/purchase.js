const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchaseSchema');
const Joi = require('joi');
const validator = require('express-joi-validation')({});
const { PurchaseRequisitionSchema } = require('../utils/validatorSchema');

const passport = require('passport');
const { isAdmin } = require("../middleWares/isAdminMW");

const BodyValidation = Joi.object(PurchaseRequisitionSchema);

/**
 * GET /api/purchase/
 * return all purchases
 */
router.get('/purchase/', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    Purchase.getAllPurchases(function (err, purchases) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).json({ success: true, purchases: purchases });
    });
});

/**
 * GET /api/purchase/:id
 * use id to return one single purchase
 */
router.get('/purchase/:id', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    const id = req.params.id;
    Purchase.getPurchaseById(id, function (err, purchase) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).json({ success: true, purchase: purchase });
    });
});

/**
 * GET /api/purchase/itens/:id
 * use id to return all itens from a single purchase
 */
router.get('/purchase/items/:id', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    const id = req.params.id;
    Purchase.getAllItens(id, function (err, items) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).json({ success: true, items: items });
    });
});

/**
 * POST /api/purchase/
 */
router.post('/purchase/', validator.body(BodyValidation), passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    let newPurchase = req.body
    Purchase.addNewPurchase(newPurchase, function (err, purchase) {
        if (err) {
            //res.json(err);
            return res.status(400).json({ success: false, msg: 'Failed to add purchase', err: err });
        }
        for (item in newPurchase.requisitionItems) {
            console.log(item)
        }
        res.status(201).json({ success: true, msg: 'Purchase added', purchase: purchase });
    });
})

/**
 * UPDATE /api/purchase/
 */
router.put('/purchase/:id', validator.body(BodyValidation), passport.authenticate('jwt', { session: false }), isAdmin, async function (req, res) {
    let updatedPurchase = req.body
    updatedPurchase.id = req.params.id
    let cont = 0
    console.log( updatedPurchase.requisitionItems)
    try {
        await updatedPurchase.requisitionItems.forEach(element => {
            console.log(element)
            element.notify = true
            cont += 1
        })
    } catch (ex) {

    }
    console.log(cont)
    console.log( updatedPurchase.requisitionItems)
    Purchase.updatePurchase(updatedPurchase, function (err, purchase) {
        if (err) {
            return res.status(400).json({ success: false, msg: 'Failed to update purchase' });
        }
        console.log(purchase)
        res.status(200).json({ success: true, msg: 'Purchase updated', purchase: purchase });
    });
});

/**
 * DELETE /api/purchase/:id
 */
router.delete('/purchase/:id', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
    const id = req.params.id;
    Purchase.deletePurchase(id, function (err, purchase) {
        if (err) {
            return res.status(400).json({ success: false, msg: 'Failed to delete purchase' });
        }
        res.status(204).send()
    })
});

module.exports = router;