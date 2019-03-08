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
		done();
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
		done()
	});
})