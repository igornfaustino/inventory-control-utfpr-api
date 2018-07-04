process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Equipment = require('../models/equipmentSchema');
let User = require('../models/userScheme');
let Admin = require('../models/adminSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
var token

describe('Equipents Route', () => {
    before((done) => {
        chai.request(server).post('/api/register').send({
            email: 'test@test.com',
            password: 'teste123',
            name: 'teste'
        }).end((err, res) => {
            Admin.addNewAdmin({admin: 'test@test.com'}, (err, user) => {
                chai.request(server).post('/api/authenticate').send({
                    email: 'test@test.com',
                    password: 'teste123',
                }).end((err, res) => {
                    token = res.body.token;
                    done()
                })
            })
        })
    });
    beforeEach((done) => {
        Equipment.remove({}, (err) => {
            done()
        });
    });
    describe('/GET Equipment', () => {
        it('it should GET all the equipments', (done) => {
            chai.request(server)
                .get('/api/equipments')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.equipments.should.be.a('array');
                    res.body.equipments.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('/POST Purchase', () => {
        it('it should not accept a Purchase without description field', (done) => {
            let equipment = {
                "siorg": "312",
                "buyer": "eu mesmo",
                "solicitor": "John do",
                "origin": "paraguai",
                "equipmentType": "consumivel",
                "equipmentState": "Novo",
                "locationHistory": []
            }
            chai.request(server)
                .post('/api/equipment')
                .send(equipment)
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should not accept a equipment with number in buyer', (done) => {
            let equipment = {
                "siorg": "312",
                "buyer": 123412341,
                "solicitor": "John do",
                "origin": "paraguai",
                "equipmentType": "consumivel",
                "equipmentState": "Novo",
                "locationHistory": []
            }
            chai.request(server)
                .post('/api/equipment')
                .send(equipment)
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should not POST a equipment with a new field', (done) => {
            let equipment = {
                "siorg": "312",
                "buyer": 123412341,
                "solicitor": "John do",
                "origin": "paraguai",
                "equipmentType": "consumivel",
                "equipmentState": "Novo",
                "locationHistory": [],
                "newRandomField": "dssfas"
            }

            chai.request(server)
                .post('/api/equipment')
                .send(equipment)
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should POST a equipment ', (done) => {
            let equipment = {
                "siorg": "312",
                "buyer": "eu mesmo",
                "solicitor": "John do",
                "description": "blabla",
                "origin": "paraguai",
                "equipmentType": "consumivel",
                "equipmentState": "Novo",
                "locationHistory": []
            }
            chai.request(server)
                .post('/api/equipment')
                .send(equipment)
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
    });
    describe('/GET/:id Equipment', () => {
        it('it should GET a equipment by the given id', (done) => {
            let equipment = new Equipment({
                "siorg": "312",
                "buyer": "eu mesmo",
                "solicitor": "John do",
                "description": "blabla",
                "origin": "paraguai",
                "equipmentType": "consumivel",
                "equipmentState": "Novo",
                "locationHistory": []
            });
            equipment.save((err, equipment) => {
                chai.request(server)
                    .get('/api/equipment/' + equipment.id)
                    .send(equipment)
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('equipment');
                        res.body.equipment.should.have.property('buyer').eql('eu mesmo')
                        done();
                    });
            });

        });
    });
    describe('/PUT/:id Equipment', () => {
        it('it should UPDATE a equipment given the id', (done) => {
            let equipment = new Equipment({
                "siorg": "312",
                "buyer": "eu mesmo",
                "solicitor": "John do",
                "description": "blabla",
                "origin": "paraguai",
                "equipmentType": "consumivel",
                "equipmentState": "Novo",
                "locationHistory": []
            });
            equipment.save((err, equipment) => {
                chai.request(server)
                    .put('/api/equipment/' + equipment.id)
                    .send({
                        "siorg": "312",
                        "buyer": "eu mesmo updated",
                        "solicitor": "John do",
                        "description": "blabla",
                        "origin": "paraguai",
                        "equipmentType": "consumivel",
                        "equipmentState": "Novo",
                        "locationHistory": []
                    })
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('result');
                        done();
                    });
            });
        });
    });
    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id equipment', () => {
        it('it should DELETE a equipment given the id', (done) => {
            let equipment = new Equipment({
                "siorg": "312",
                "buyer": "eu mesmo updated",
                "solicitor": "John do",
                "description": "blabla",
                "origin": "paraguai",
                "equipmentType": "consumivel",
                "equipmentState": "Novo",
                "locationHistory": []
            });
            equipment.save((err, equipment) => {
                chai.request(server)
                    .delete('/api/equipment/' + equipment.id)
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
        });
    });
    after(done => {
        User.remove({}, () => {
            Admin.remove({}, () => {
                done()
            })
        })
    })
});