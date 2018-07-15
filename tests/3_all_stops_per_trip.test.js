const chai = require('chai');

const expect = chai.expect;
const should = chai.should();
const url = 'http://localhost:3000';
const request = require('supertest')(url);


describe('All Stops Per Given Trip', () => {
  it('Returns an array of stops', (done) => {
    request.post('/graphql')
    .send({"query": "{allStopTimes(condition: {tripId: 2036041}) {nodes {tripByTripId {routeId} stopId stopByStopId {stopName}}}}" })
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.allStopTimes.nodes.should.be.an('array');
        done();
    })
  })

  it('Returns an array of more than one (1) route', (done) => {
    request.post('/graphql')
    .send({"query": "{allStopTimes(condition: {tripId: 2036041}) {nodes {tripByTripId {routeId} stopId stopByStopId {stopName}}}}" })
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.allStopTimes.nodes.should.have.lengthOf.above(1);
        done();
    })
  })

  it('A returned object has a "stopId" key', (done) => {
    request.post('/graphql')
    .send({"query": "{allStopTimes(condition: {tripId: 2036041}) {nodes {tripByTripId {routeId} stopId stopByStopId {stopName}}}}" })
    .expect(200)
    .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.allStopTimes.nodes[0]).to.have.any.keys('stopId');
        done();
    })
  })
});