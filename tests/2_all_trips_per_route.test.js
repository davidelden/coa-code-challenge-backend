const chai = require('chai');

const expect = chai.expect;
const should = chai.should();
const url = 'http://localhost:3000';
const request = require('supertest')(url);

describe('All Trips Per Given Route', () => {
  it('Returns an array of trips', (done) => {
    request.post('/graphql')
    .send({"query": "{allTrips(condition: {routeId: 10}) {totalCount nodes {routeId tripId tripHeadsign }}}" })
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.allTrips.nodes.should.be.an('array');
        done();
    })
  })

  it('Returns an array of more than one (1) route', (done) => {
    request.post('/graphql')
    .send({"query": "{allTrips(condition: {routeId: 10}) {totalCount nodes {routeId tripId tripHeadsign }}}" })
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.allTrips.nodes.should.have.lengthOf.above(1);
        done();
    })
  })
});