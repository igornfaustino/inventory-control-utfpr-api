process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Purchase = require('../models/purchaseSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Purchase Route', () => {
    beforeEach((done) => {
        Purchase.remove({}, (err) => {
            done();
        });
    });
    describe('/GET Purchase', () => {
        it('it should GET all the purchase', (done) => {
            chai.request(server)
                .get('/api/purchase')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.purchases.should.be.a('array');
                    res.body.purchases.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('/POST Purchase', () => {
        it('it should not accept a Purchase without requisition items', (done) => {
            let purchase = {
                "management": "UTFPR",
                "requisitionDate": "01-19-2005",
                "UGR": "1500",
                "sector": "dacom",
                "requester": "zanone"
            }
            chai.request(server)
                .post('/api/purchase')
                .send(purchase)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should not accept a Purchase with number in sector', (done) => {
            let purchase = {
                "management": "UTFPR",
                "requisitionDate": "01-19-2005",
                "UGR": "1500",
                "sector": 123123,
                "requester": "zanone",
                "requisitionItems": []
            }
            chai.request(server)
                .post('/api/purchase')
                .send(purchase)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should not POST a Purchase with a new field', (done) => {
            let purchase = {
                "management": "UTFPR",
                "requisitionDate": "01-19-2005",
                "UGR": "1500",
                "sector": "dacom",
                "newFiels": "test",
                "requester": "zanone",
                "requisitionItems": []
            }

            chai.request(server)
                .post('/api/purchase')
                .send(purchase)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should POST a Purchase ', (done) => {
            let purchase = {
                "number": "2018/43",
                "management": "UTFPR",
                "requisitionDate": "01-19-2005",
                "UGR": "1500",
                "sector": "dacom",
                "requester": "zanone",
                "requisitionItems": []
            }
            chai.request(server)
                .post('/api/purchase')
                .send(purchase)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
    });
    describe('/GET/:id Purchase', () => {
        it('it should GET a Purchase by the given id', (done) => {
            let purchase = new Purchase({
                "number":"2018/2",
                "management": "UTFPR",
                "requisitionDate": "01-19-2005",
                "UGR": "1500",
                "sector": "dacom",
                "requester": "zanone",
                "requisitionItems": []
            });
            purchase.save((err, purchase) => {
                chai.request(server)
                    .get('/api/purchase/' + purchase.id)
                    .send(purchase)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('purchase');
                        res.body.purchase.should.have.property('number').eql('2018/2')
                        done();
                    });
            });

        });
    });
    describe('/PUT/:id Purchase', () => {
        it('it should UPDATE a Purchase given the id', (done) => {
            let purchase = new Purchase({
                "management": "UTFPR",
                "requisitionDate": "01-19-2005",
                "UGR": "1500",
                "sector": "dacom",
                "requester": "zanone",
                "requisitionItems": []
            });
            purchase.save((err, purchase) => {
                chai.request(server)
                    .put('/api/purchase/' + purchase.id)
                    .send({
                        "management": "UTFPR",
                        "requisitionDate": "02-19-2005",
                        "UGR": "1500",
                        "sector": "dacom Updated",
                        "requester": "zanone",
                        "requisitionItems": []
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });
	/*
	 * Test the /DELETE/:id route
	 */
    describe('/DELETE/:id purchase', () => {
        it('it should DELETE a purchase given the id', (done) => {
            let purchase = new Purchase({
                "management": "UTFPR",
                "requisitionDate": "01-19-2005",
                "UGR": "1500",
                "sector": "dacom",
                "requester": "zanone",
                "requisitionItems": []
            });
            purchase.save((err, purchase) => {
                chai.request(server)
                    .delete('/api/purchase/' + purchase.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('msg').eql('Purchase deleted');
                        res.body.should.have.property('success').eql(true);
                        done();
                    });
            });
        });
    });
});