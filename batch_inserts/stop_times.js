const seedHelper = require('../seeds/helpers/seed_helper.js');
const seeds = seedHelper.getSeedObjs('./seeds/sources/stop_times.json');
const knex = require('knex');

const ENV = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const db = knex(config[ENV]);

const chunkSize = 30;

// Deletes ALL existing entries
db('stop_times').del()
  .then(function() {
    // Reset sequence to begin with 1
    return db.raw('ALTER SEQUENCE stop_times_id_seq RESTART WITH 1');
  })
  .then(function() {
    // Set next id value to 1
    return db.raw('UPDATE stop_times SET id=nextval(?)', 'stop_times_id_seq');
  })
  .then(function() {
    // Batch insert data
    return db.batchInsert('stop_times', seeds, chunkSize);
  })
  .then(function() {
    console.log('Batch insert complete');
    process.exit();
  })
  .catch((err) => console.log(err));