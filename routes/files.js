const express = require('express');
const router = express.Router();
const { upload } = require('../utils/storageEngine')
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const passport = require('passport');

let gfs

mongoose.connection.once('open', function () {
    // initialize stream
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

router.post('/file/', passport.authenticate('jwt', { session: false }), upload.single('file'), function (req, res) {
    res.status(201).json({ fileId: req.file.filename, file:req.file });
})

router.get('/file/:filename', passport.authenticate('jwt', { session: false }), function (req, res) {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        console.log(err)
        if (!file || file.lenght === 0) {
            return res.status(404).json({
                err: 'No file exists'
            })
        }
        // file exists
        if (file.contentType === "application/pdf") {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'File is not a PDF'
            })
        }
    })
})

router.delete('/file/:filename', passport.authenticate('jwt', { session: false }), function (req, res) {
    gfs.remove({ filename: req.params.filename, root: 'uploads' }, function (err) {
        if (err) {
            return res.json({ success: false, msg: 'Failed to delete file' });
        }
        res.status(204).send()
    });
})

module.exports = router