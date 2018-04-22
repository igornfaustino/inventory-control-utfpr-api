const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchase');
const { check, validationResult } = require('express-validator/check');
/**
 * 
 */
const purchaseValidator = [
    check('management')
        .exists(),
    check('UGR')
        .exists(),
    check('requisitionDate')
        .exists()
        .matches(/^\d{2}\/\d{2}\/\d{4}$/).withMessage('invalid date')
        .toDate(),
    check('originOfCost')
        .exists(),
    check('sector')
        .exists(),
    check('requester')
        .exists(),
];
/**
 * GET /api/purchase/
 * return all purchases
 */
router.get('/purchase/', function(req, res) {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ success: false, errors: errors.mapped() });
	}
    Purchase.getAllPurchases(function(err, purchases) {
        if(err) {
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
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ success: false, errors: errors.mapped() });
	}
	const id = req.params.id;
	Purchase.getPurchaseById(id, function (err, purchase) {
		if (err) {
			res.status(400).send(err);
		}
		res.json({ success: true, purchase: purchase });
	});
});
/**POST /api/purchase/
 * body:
 *{
    "management": "UTFPR",
    "requisitionDate": "19/05/05",
    "UGR": "1500",
    "originOfCost": "comsuption",
    "sector": "dacom",
    "requester": "zanone",
        "requisitionItems": [{
            "itemId": 1,
                "itemSupplier": [{
                    "supplierId": 1,
                }]
        }]
    }
 */
router.post('/purchase/', function(req, res) {
    let newPurchase = {};
    newPurchase.management = req.body.management;
    newPurchase.requisitionDate = req.body.requisitionDate;
    newPurchase.UGR = req.body.UGR;
    newPurchase.originOfCost = req.body.originOfCost;
    newPurchase.sector = req.body.sector;
    newPurchase.requester = req.body.requester;
    newPurchase.requisitionItems = req.body.requisitionItems;
    Purchase.addNewPurchase(newPurchase, function(err, purchase) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, errors: errors.mapped() });
        }
        if(err) {
            //res.json(err);
            res.json({ success: false, msg: 'Failed to add purchase'});
        } else {
            res.json({ success: true, msg: 'Purchase added', purchase: purchase});
        }
    });
})
/**
 * UPDATE /api/purchase/:id
 */
router.put('/purchase/:id', function(req, res) {
    let updatedPurchase = {};
    updatedPurchase._id = req.params.id;
    updatedPurchase.management = req.body.management;
    updatedPurchase.requisitionDate = req.body.requisitionDate;
    updatedPurchase.UGR = req.body.UGR;
    updatedPurchase.originOfCost = req.body.originOfCost;
    updatedPurchase.sector = req.body.sector;
    updatedPurchase.requester = req.body.requester;
    updatedPurchase.requisitionItems = req.body.requisitionItems;
    Purchase.updatePurchase(updatedPurchase, function(err, purchase) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, errors: errors.mapped() });
        }
        if(err) {
            res.json({ success: false, msg: 'Failed to update purchase' });
        } else {
            res.json({ success: true, msg: 'Purchase updated', purchase: purchase});
        }
    });
});

/**
 * DELETE /api/purchase/:id
 */
router.delete('/purchase/:id', function(req, res) {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ success: false, errors: errors.mapped() });
	}
    const id = req.params.id;
    Purchase.deletePurchase(id, function(err, purchase) {
        if(err) {
            res.json({ success: false, msg: 'Failed to delete purchase' });
        } else {
            res.json({ success: true, msg: 'Purchase deleted', purchase: purchase})
        }
    })
});

module.exports = router;