const express = require('express');
const router = express.Router();
const { upload } = require('../utils/storageEngine')
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const config = require('config'); //we load the db location from the JSON files

let gfs

mongoose.connection.once('open', function () {
    // initialize stream
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

router.post('/file/', upload.single('file'), function (req, res) {
    res.json({ fileId: req.file.filename });
})

router.get('/file/:filename', function (req, res) {
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

router.delete('/file/:filename', function (req, res) {
    gfs.remove({ filename: req.params.filename, root: 'uploads' }, function (err) {
        if (err) {
            return res.json({ success: false, msg: 'Failed to delete file' });
        }
        res.json({ success: true, msg: 'file deleted' })
    });
})

module.exports = router