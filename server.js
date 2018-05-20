const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const server = express();
const port = 8080;

const config = require('config'); //we load the db location from the JSON files

// routes
const index = require('./routes/index');
const users = require('./routes/users');
const requisition = require('./routes/requisition');
const purchase = require('./routes/purchase');
const files = require('./routes/files');
const equipments = require('./routes/equipments');
const supplier = require('./routes/supplier');

// --------- db connection ------------

//db options
const options = {
	useMongoClient: true
};

mongoose.connect(config.DBHost, options);
const conn = mongoose.connection;

conn.on('connected', function () {
	console.log('database connected to ' + config.DBHost);
});

conn.on('error', function (err) {
	console.log('database connection error: ' + err);
});

conn.on('disconnected', function () {
	console.log('database disconnected');
});

// --------- Middlewares -----------

//don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
	//use morgan to log at command line
	server.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text                                        
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.text());
server.use(bodyParser.json({ type: 'application/json' }));
server.use(cookieParser());

server.use(methodOverride('_method'));
server.use(cors());

// use routers
server.use('/api', index);
server.use('/api', users);
server.use('/api', requisition);
server.use('/api', purchase);
server.use('/api', files);
server.use('/api', equipments);
server.use('/api', supplier);

//error handler

server.use(function (err, req, res, next) {
	if (err.isBoom) {
		return res.status(err.output.statusCode).json(err.output.payload);
	}
});

server.listen(port);
console.log('Listening on port ' + port);

module.exports = server // for testing
