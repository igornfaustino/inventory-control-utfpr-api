process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Requisition = require('../models/requisitionSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Items Requisition Route', () => {
	beforeEach((done) => {
		Requisition.remove({}, (err) => {
			done();
		});
	});
	describe('/GET requisition', () => {
		it('it should GET all the requisition', (done) => {
			chai.request(server)
				.get('/api/requisition')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.requisitions.should.be.a('array');
					res.body.requisitions.length.should.be.eql(0);
					done();
				});
		});
	});
	describe('/POST requisition', () => {
		it('it should not accept a requisition without description field', (done) => {
			let requisition = {
				justification: "The Lord of the Rings",
				qtd: 2
			}
			chai.request(server)
				.post('/api/requisition')
				.send(requisition)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('error');
					done();
				});
		});
		it('it should not accept a requisition with string in the qtd', (done) => {
			let requisition = {
				justification: "The Lord of the Rings",
				qtd: "two"
			}
			chai.request(server)
				.post('/api/requisition')
				.send(requisition)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('error');
					done();
				});
		});
		it('it should not POST a requisition with a new field', (done) => {
			let requisition = {
				"siorg": "12345",
				"wrongField": "blabla",
				"description": "blablabla",
				"justification": "blabla",
				"prices": [{
					"type": "url",
					"priceRef": "www.google.com",
					"value": 12.0
				}],
				"qtd": 3
			}
			chai.request(server)
				.post('/api/requisition')
				.send(requisition)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('error');
					done();
				});
		});
		it('it should POST a requisition ', (done) => {
			let requisition = {
				"siorg": "12345",
				"description": "blablabla",
				"justification": "blabla",
				"prices": [{
					"type": "url",
					"priceRef": "www.google.com",
					"value": 12.0
				}],
				"qtd": 3
			}
			chai.request(server)
				.post('/api/requisition')
				.send(requisition)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success').eql(true);
					res.body.requisition.should.have.property('siorg');
					res.body.requisition.should.have.property('description');
					res.body.requisition.should.have.property('justification');
					res.body.requisition.should.have.property('prices');
					res.body.requisition.should.have.property('qtd');
					done();
				});
		});
	});
	describe('/GET/:id requisition', () => {
		it('it should GET a requisition by the given id', (done) => {
			let requisition = new Requisition({
				siorg: "12345",
				description: "blablabla",
				justification: "blabla",
				prices: [{
					type: "url",
					priceRef: "www.google.com",
					value: 12.0
				}],
				qtd: 3
			});
			requisition.save((err, requisition) => {
				chai.request(server)
					.get('/api/requisition/' + requisition.id)
					.send(requisition)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('success').eql(true);
						res.body.requisition.should.have.property('siorg');
						res.body.requisition.should.have.property('description');
						res.body.requisition.should.have.property('justification');
						res.body.requisition.should.have.property('prices');
						res.body.requisition.should.have.property('qtd');
						done();
					});
			});

		});
	});
	describe('/PUT/:id requisition', () => {
		it('it should UPDATE a requisition given the id', (done) => {
			let requisition = new Requisition({
				siorg: "12345",
				description: "blablabla",
				justification: "blabla",
				prices: [{
					type: "url",
					priceRef: "www.google.com",
					value: 12.0
				}],
				qtd: 3
			});
			requisition.save((err, requisition) => {
				chai.request(server)
					.put('/api/requisition/' + requisition.id)
					.send({
						siorg: "123456",
						description: "blablablaalterado",
						justification: "blabla",
						prices: [{
							type: "url",
							priceRef: "www.google.com.br",
							value: 13.0
						}],
						qtd: 3
					})
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.requisition.should.have.property('siorg').eql('123456');
						res.body.requisition.should.have.property('description').eql("blablablaalterado");
						res.body.requisition.should.have.property('description').eql("blablablaalterado");
						res.body.requisition.should.have.property('justification').eql("blabla");
						res.body.requisition.prices.should.be.a('array');
						res.body.requisition.prices.length.should.be.eql(1);
						res.body.requisition.should.have.property('qtd').eql(3);
						done();
					});
			});
		});
	});
	/*
	 * Test the /DELETE/:id route
	 */
	describe('/DELETE/:id requisition', () => {
		it('it should DELETE a requisition given the id', (done) => {
			let requisition = new Requisition({
				siorg: "12345",
				description: "blablabla",
				justification: "blabla",
				prices: [{
					type: "url",
					priceRef: "www.google.com"
				}],
				qtd: 3
			});
			requisition.save((err, requisition) => {
				chai.request(server)
					.delete('/api/requisition/' + requisition.id)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('msg').eql('Requisition deleted');
						res.body.should.have.property('success').eql(true);
						done();
					});
			});
		});
	});
});