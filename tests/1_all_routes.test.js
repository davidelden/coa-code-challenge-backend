const chai = require('chai');

const expect = chai.expect;
const should = chai.should();
const url = 'http://localhost:3000';
const request = require('supertest')(url);

describe('All Routes', () => {
  it('Returns an array of routes', (done) => {
    request.post('/graphql')
    .send({"query": "{allRoutes {edges {node {id }}}}" })
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.allRoutes.edges.should.be.an('array');
        done();
    })
  })

  it('Returns an array of more than one (1) route', (done) => {
    request.post('/graphql')
    .send({"query": "{allRoutes {edges {node {id }}}}" })
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.allRoutes.edges.should.have.lengthOf.above(1);
        done();
    })
  })
});