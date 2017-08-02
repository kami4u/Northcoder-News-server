process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../server');
const saveTestData = require('../seed/test.seed');

describe('API', function () {
  // let usefulData;
  beforeEach(done => {
    mongoose.connection.dropDatabase()
      .then(saveTestData)
      .then(() => {
        // usefulData = data;
       // console.log(usefulData);
        done();
      })
      .catch(done);
  });
  describe('GET /', function () {
    it('responds with status code 200', function (done) {
      request(server)
        .get('/')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).to.equal(200);
            expect(res.body).to.equal('All good!');
            done();
          }
        });
    });
  });
  // Topics
  describe('GET /api/topics', function () {
    it('responds with status code 200 and get TOPICS', function (done) {
      request(server).get('/api/topics')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(3);
            done();
          }
        });
    });
  });
  // get Article By Topic id
  describe('GET /api/topics/:topic_id/articles', function () {
    it('responds with status code 200 and get ARTICLE', function (done) {
      request(server).get('/api/topics/football/articles')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            done();
          }
        });
    });
  });
  // Articles
  describe('GET /api/articles', function () {
    it('responds with status code 200 and get ARTICLES', function (done) {
      request(server).get('/api/articles')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(2);
            done();
          }
        });
    });
  });
});