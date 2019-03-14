const request = require('supertest');
const usersTest = require('../../database/users');
const app = require('../../app');

beforeEach(() => {
  usersTest.clearTestUserTable()
});

describe('GET /users/someroute', () => {
  test('responds with 404 status for an incorrect route', function (done) {
    request(app)
      .get('/users/someroute')
      .expect(404, done)
  });
})

describe('GET /users/signup', () => {
  test('responds with 200 status when user navigates to signup page', function (done) {
    request(app)
      .get('/users/signup')
      .expect(200, done);
  });
})

describe('POST /users/signup', () => {
  test('responds with 302 status, whether user signup is successful or not', function (done) {
    request(app)
      .post('/users/signup')
      .send({
        "username": "testuser",
        "firstname": "test",
        "lastname": "user",
        "email": "testuser@gmail.com",
        "password": "testuser"
      })
      .set('Accept', 'application/json')
      .expect(302, done)
  });
})

describe('GET /users/login', () => {
  test('responds with 200 status when user navigates to login page', function (done) {
    request(app)
      .get('/users/login')
      .expect(200, done);
  });
})

describe('POST /users/login', () => {
  test('responds with 302 status, whether user login is successful or not', function (done) {
    request(app)
      .post('/users/signup')
      .send({
        "username": "testuser",
        "firstname": "test",
        "lastname": "user",
        "email": "testuser@gmail.com",
        "password": "testuser"
      });
    request(app)
      .post('/users/login')
      .send({
        username: "testuser",
        password: "testuser",
      })
      .set('Accept', 'application/json')
      .expect(302, done)
  });
})

