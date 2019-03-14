const request = require('supertest');
const app = require('../../app');

describe('GET /api/products', () => {
	test('responds with json containing product details, and 200 status', (done) => {
		request(app)
			.get('/api/products/')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
})

describe('PUT /api/products', () => {
	test('when the product exists, it updates the quantity, and responds with 200 status', (done) => {
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
	test('responds with 400 status request is made without sending data', (done) => {
		request(app)
			.put('/api/products/1')
			.send()
			.set('Accept', 'application/json')
			.expect(400, done);
	});
})