const seedHelper = require('../seeds/helpers/seed_helper.js');
const seeds = seedHelper.getSeedObjs('./seeds/sources/stops.json');
const knex = require('knex');

const ENV = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const db = knex(config[ENV]);

const chunkSize = 30;

// Deletes ALL existing entries
db('stops').del()
  .then(function() {
    // Reset sequence to begin with 1
    return db.raw('ALTER SEQUENCE stops_id_seq RESTART WITH 1');
  })
  .then(function() {
    // Set next id value to 1
    return db.raw('UPDATE stops SET id=nextval(?)', 'stops_id_seq');
  })
  .then(function() {
    // Batch insert data
    return db.batchInsert('stops', seeds, chunkSize);
  })
  .then(function() {
    console.log('Batch insert complete');
    process.exit();
  })
  .catch((err) => console.log(err));