//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
// let Book = require('../app/models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
	/*
	  * Test the /GET route
	  */
	describe('/GET index', () => {
		it('it should GET a index text', (done) => {
			chai.request(server)
				.get('/api/')
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});

});