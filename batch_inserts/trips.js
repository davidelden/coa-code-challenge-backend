const seedHelper = require('../seeds/helpers/seed_helper.js');
const seeds = seedHelper.getSeedObjs('./seeds/sources/trips.json');
const knex = require('knex');

const ENV = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const db = knex(config[ENV]);

const chunkSize = 30;

// Deletes ALL existing entries
db('trips').del()
  .then(function() {
    // Reset sequence to begin with 1
    return db.raw('ALTER SEQUENCE trips_id_seq RESTART WITH 1');
  })
  .then(function() {
    // Set next id value to 1
    return db.raw('UPDATE trips SET id=nextval(?)', 'trips_id_seq');
  })
  .then(function() {
    // Batch insert data
    return db.batchInsert('trips', seeds, chunkSize);
  })
  .then(function() {
    console.log('Batch insert complete');
    process.exit();
  })
  .catch((err) => console.log(err));