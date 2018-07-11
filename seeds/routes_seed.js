const seedHelper = require('./helpers/seed_helper.js');
const seeds = seedHelper.getSeedObjs('./seeds/sources/routes.json');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('routes').del()
    .then(function() {
      // Reset sequence to begin with 1
      return knex.raw('ALTER SEQUENCE routes_id_seq RESTART WITH 1');
    })
    .then(function() {
      // Set next id value to 1
      return knex.raw('UPDATE routes SET id=nextval(?)', 'routes_id_seq');
    })
    .then(function () {
      // Inserts seed entries      
      return knex('routes').insert(
        seeds
      );
    });
};