const express = require('express');
const server = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 8080;
const config = require('config'); //we load the db location from the JSON files

// routes
const index = require('./routes/index');
const users = require('./routes/users');
const requisition = require('./routes/requisition');

//db options
const options = {
	useMongoClient: true
};

//db connection      
mongoose.connect(config.DBHost, options, function () {
	console.log("database connected");
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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

// use routers
server.use('/api', index);
server.use('/api', users);
server.use('/api', requisition);

server.listen(port);
console.log('Listening on port ' + port);

module.exports = server; // for testing
