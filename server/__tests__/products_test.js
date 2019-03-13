const request = require('supertest');
const app = require('../app')

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
				shop_quantity: 9,
			})
			.set('Accept', 'application/json')
			.expect(200, done);
	});
})

describe('PUT /api/products', () => {
	test('responds with 404 status', function (done) {
		request(app)
			.put('/api/products/1')
			.send()
			.set('Accept', 'application/json')
			.expect(400, done);
	});
})