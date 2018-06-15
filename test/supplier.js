process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Supplier = require('../models/supplierSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Equipents Route', () => {
    beforeEach((done) => {
        Supplier.remove({}, (err) => {
            done();
        });
    });
    describe('/GET suppliers', () => {
        it('it should GET all the suppliers', (done) => {
            chai.request(server)
                .get('/api/suppliers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.suppliers.should.be.a('array');
                    res.body.suppliers.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('/POST Supplier', () => {
        it('it should not accept a supplier without cnpj field', (done) => {
            let supplier = {
                "name":"tio",
                "phone":"5518996954572",
                "address": {
                    "number": 791,
                    "street": "R Washington Luiz",
                    "city": "Rancharia",
                    "state": "SP",
                    "country": "Brasil"
                }
            }
            chai.request(server)
                .post('/api/supplier')
                .send(supplier)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should not accept a supplier with number in name', (done) => {
            let supplier = {
                "name":1341234123,
                "cnpj":"4123413241",
                "phone":"5518996954572",
                "address": {
                    "number": 791,
                    "street": "R Washington Luiz",
                    "city": "Rancharia",
                    "state": "SP",
                    "country": "Brasil"
                }
            }
            chai.request(server)
                .post('/api/supplier')
                .send(supplier)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should not POST a supplier with a new field', (done) => {
            let supplier = {
                "name":"tio",
                "cnpj":"4123413241",
                "phone":"5518996954572",
                "newField":341,
                "address": {
                    "number": 791,
                    "street": "R Washington Luiz",
                    "city": "Rancharia",
                    "state": "SP",
                    "country": "Brasil"
                }
            }

            chai.request(server)
                .post('/api/supplier')
                .send(supplier)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should POST a supplier ', (done) => {
            let supplier = {
                "name":"tio",
                "cnpj":"4123413241",
                "phone":"5518996954572",
                "address": {
                    "number": 791,
                    "street": "R Washington Luiz",
                    "city": "Rancharia",
                    "state": "SP",
                    "country": "Brasil"
                }
            }
            chai.request(server)
                .post('/api/supplier')
                .send(supplier)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
    });
    describe('/GET/:id Supplier', () => {
        it('it should GET a supplier by the given id', (done) => {
            let supplier = new Supplier({
                "name":"tio",
                "cnpj":"4123413241",
                "phone":"5518996954572",
                "address": {
                    "number": 791,
                    "street": "R Washington Luiz",
                    "city": "Rancharia",
                    "state": "SP",
                    "country": "Brasil"
                }
            });
            supplier.save((err, supplier) => {
                chai.request(server)
                    .get('/api/supplier/' + supplier.id)
                    .send(supplier)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('supplier');
                        res.body.supplier.should.have.property('name').eql('tio')
                        done();
                    });
            });

        });
    });
    describe('/PUT/:id Supplier', () => {
        it('it should UPDATE a supplier given the id', (done) => {
            let supplier = new Supplier({
                "name":"tio",
                "cnpj":"4123413241",
                "phone":"5518996954572",
                "address": {
                    "number": 791,
                    "street": "R Washington Luiz",
                    "city": "Rancharia",
                    "state": "SP",
                    "country": "Brasil"
                }
            });
            supplier.save((err, supplier) => {
                chai.request(server)
                    .put('/api/supplier/' + supplier.id)
                    .send({
                        "name":"update",
                        "cnpj":"4123413241",
                        "phone":"5518996954572",
                        "address": {
                            "number": 791,
                            "street": "R Washington Luiz",
                            "city": "Rancharia",
                            "state": "SP",
                            "country": "Brasil"
                        }
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('result');
                        res.body.result.should.have.property('nModified').eql(1)
                        done();
                    });
            });
        });
    });
	/*
	 * Test the /DELETE/:id route
	 */
    describe('/DELETE/:id Supplier', () => {
        it('it should DELETE a supplier given the id', (done) => {
            let supplier = new Supplier({
                "name":"tio",
                "cnpj":"4123413241",
                "phone":"5518996954572",
                "address": {
                    "number": 791,
                    "street": "R Washington Luiz",
                    "city": "Rancharia",
                    "state": "SP",
                    "country": "Brasil"
                }
            });
            supplier.save((err, supplier) => {
                chai.request(server)
                    .delete('/api/supplier/' + supplier.id)
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
        });
    });
});