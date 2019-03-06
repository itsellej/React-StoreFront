const request = require('supertest');
const app = require('../index')

describe('GET /api/products', () => {
    test('responds with json and 200 status', function (done) {
        request(app)
            .get('/api/products/')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
})
describe('PUT /api/products', () => {
    test('responds with 200 status', function (done) {
        request(app)
            .put('/api/products/1')
            .send({
                id: 1,
                shop_quantity: 11,
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
})

describe('GET /users/login', () => {
    test('responds with 200 status', function (done) {
        request(app)
            .get('/users/login')
            .expect(200, done);
    });
})

describe('GET /users/signup', () => {
    test('responds with 200 status', function (done) {
        request(app)
            .get('/users/signup')
            .expect(200, done);
    });
})

describe('POST /users/signup', () => {
    test('responds with 200 status', function (done) {
        request(app)
            .post('/users/signup')
            .send({
                first_name: "Shelly",
                last_name: "Smith",
                email: "ssmith@gmail.com",
                password: "password",
            })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Registered successfully')
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    test('responds with 400 status if first name length is less than 2', function (done) {
        request(app)
            .post('/users/signup')
            .send({
                first_name: "S",
                last_name: "Smith",
                email: "ssmith@gmail.com",
                password: "password",
            })
            .set('Accept', 'application/json')
            .expect(400)
            .expect('"first_name" length must be at least 2 characters long')
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    test('responds with 400 status if last name length is less than 2', function (done) {
        request(app)
            .post('/users/signup')
            .send({
                first_name: "Shelley",
                last_name: "S",
                email: "ssmith@gmail.com",
                password: "password",
            })
            .set('Accept', 'application/json')
            .expect(400)
            .expect('"last_name" length must be at least 2 characters long')
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    test('responds with 400 status if email address does not match schema', function (done) {
        request(app)
            .post('/users/signup')
            .send({
                first_name: "Shelley",
                last_name: "Smith",
                email: "ssmith",
                password: "password",
            })
            .set('Accept', 'application/json')
            .expect(400)
            .expect('"email" must be a valid email')
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    test('responds with 400 status if password is less than 8 characters', function (done) {
        request(app)
            .post('/users/signup')
            .send({
                first_name: "Shelley",
                last_name: "Smith",
                email: "ssmith@gmail.com",
                password: "passwor",
            })
            .set('Accept', 'application/json')
            .expect(400)
            .expect('"password" length must be at least 8 characters long')
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
})