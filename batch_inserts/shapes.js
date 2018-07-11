const seedHelper = require('../seeds/helpers/seed_helper.js');
const seeds = seedHelper.getSeedObjs('./seeds/sources/shapes.json');
const knex = require('knex');

const ENV = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const db = knex(config[ENV]);

const chunkSize = 30;

var shapeIDSeeds = [];

// Extract unique shape_id's from shapes.json
var prevValue = undefined;
var uniqueShapeIDs = seeds.forEach((elem) => {
  if(elem.shape_id != prevValue) {
    // Create array of objects to batch insert into shapes DB table
    shapeIDSeeds.push({"shape_id": elem.shape_id});
  }
  prevValue = elem.shape_id;
});

// Deletes ALL existing entries
db('shapes').del()
  .then(function() {
    // Reset sequence to begin with 1
    return db.raw('ALTER SEQUENCE shapes_id_seq RESTART WITH 1');
  })
  .then(function() {
    // Set next id value to 1
    return db.raw('UPDATE shapes SET id=nextval(?)', 'shapes_id_seq');
  })
  .then(function() {
    // Batch insert data
    return db.batchInsert('shapes', shapeIDSeeds, chunkSize);
  })
  .then(function() {
    console.log('Batch insert complete');
    process.exit();
  })
  .catch((err) => console.log(err));