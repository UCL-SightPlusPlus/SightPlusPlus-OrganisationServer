const server = require('../server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);
const site_name = 'GOSH';

describe('Server Profile APIs', () => {

    // GET index page
    describe('Test GET route /', () => {
        it('It should render index page', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.header('content-type', 'text/html; charset=utf-8'); 
                    done();
                });
        });
    });

    // POST
    describe('Test POST route /profile', () => {
        it('It should return success message', (done) => {
            const profile = {
                "_id": 1,
                "site_name": "GOSH",
                "devices" :[
                    {
                        "_id": "2",
                        "deviceType": "Camera02",
                        "deviceLocation": "Reception",
                        "site": "GOSH DRIVE",
                        "isIndoor": true,
                        "floor": 0,
                        "maxOccupancy": 60,
                        "__v": 0,
                        "running": 0 
                    },
                    {
                        "_id": "4",
                        "deviceType": "BLE",
                        "deviceLocation": "ER",
                        "site": "GOSH DRIVE",
                        "isIndoor": true,
                        "floor": 0,
                        "maxOccupancy": 60,
                        "__v": 0
                    }
                ]
            }

            chai.request(server)
                .post('/profile')
                .set('content-type', 'application/json')
                .send(profile)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.eq('success');
                    done();
                });
        });
    });

    // DELETE
    describe('Test DELETE route /profile/:name',  () => {
        it('It should return success message', (done) => {
            chai.request(server)
                .delete('/profile/' + site_name)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eq('Deletion succeed!');
                    done();
                });
        });
    });
});
