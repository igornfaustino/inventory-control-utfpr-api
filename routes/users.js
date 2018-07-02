const express = require('express');
const router = express.Router();
const Admin = require('../models/adminSchema');

/* GET users listing. */
router.get('/', function(req, res) {
	res.send('respond with a resource');
});

// Admin Functions

// GET all type of itens.
router.get('/admin', function (req, res) {
    Admin.getAllAdmin((err, admin) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({ success: true, admin: admin })
    })
});

// add new Admin
router.post('/admin', function (req, res) {
    let newAdmin = req.body;
    Admin.addNewAdmin(newAdmin, (err, admin) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(201).json({ success: true, msg: 'Admin added', admin: admin });
    })
});

/**
 * DELETE /api/equipment/:id
 */
router.delete('/admin/:id', function (req, res) {
    const id = req.params.id;
    Admin.deleteAdmin(id, function (err) {
        if (err) {
            return res.json({ success: false, msg: 'Failed to delete Admin' });
        }
        res.status(204).send()
    });
});

module.exports = router;
