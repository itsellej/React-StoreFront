const request = require('supertest');
require('dotenv').config();
let app;

beforeEach(() => {
  // process.env.NODE_ENV = 'test';
  // jest.resetModules();
  app = require('../app')
})

// afterEach(() => {
//   delete process.env.NODE_ENV;
// });

describe('GET /users/someroute', () => {
  test('responds with 404 status for an incorrect route', function (done) {
    request(app)
      .get('/users/someroute')
      .expect(404, done)

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
  test('responds with 302 status', function (done) {
    request(app)
      .post('/users/signup')
      .send({
        "username": "dddddd",
        "firstname": "dddddd",
        "lastname": "dddddd",
        "email": "dddddd@gmail.com",
        "password": "dddddddddd"
      })
      .set('Accept', 'application/json')
      .expect(302, done)
  });
})

describe('GET /users/login', () => {
  test('responds with 200 status', function (done) {
    request(app)
      .get('/users/login')
      .expect(200, done);
  });
})

describe('POST /users/login', () => {
  test('responds with 302 status', function (done) {
    request(app)
      .post('/users/login')
      .send({
        username: "shellbell",
        password: "password",
      })
      .set('Accept', 'application/json')
      .expect(302, done)
  });
})

