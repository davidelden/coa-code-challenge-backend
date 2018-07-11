exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('routes').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('routes', (tbl) => {
          tbl.increments('id').primary();
          tbl.integer('route_id').unique();
          tbl.integer('agency_id');
          tbl.integer('route_short_name');
          tbl.string('route_long_name');
          tbl.text('route_desc');
          tbl.integer('route_type');
          tbl.string('route_url');
          tbl.string('route_color');
          tbl.string('route_text_color');
          tbl.timestamps(true, true);
        })
      }
    }),
    knex.schema.hasTable('shapes').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('shapes', (tbl) => {
          tbl.increments('id').primary();
          tbl.integer('shape_id').unique();
          tbl.timestamps(true, true);
        })
      }
    }),
    knex.schema.hasTable('shape_sequences').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('shape_sequences', (tbl) => {
          tbl.increments('id').primary();
          tbl.integer('shape_id').references('shapes.shape_id').onDelete('CASCADE').index();
          tbl.float('shape_pt_lat');
          tbl.float('shape_pt_lon');
          tbl.integer('shape_pt_sequence');
          tbl.float('shape_dist_traveled');
          tbl.timestamps(true, true);
        })
      }
    }),
    knex.schema.hasTable('trips').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('trips', (tbl) => {
          tbl.increments('id').primary();
          tbl.integer('route_id').references('routes.route_id').onDelete('CASCADE').index();
          tbl.string('service_id');
          tbl.integer('trip_id');
          tbl.string('trip_headsign');
          tbl.string('trip_short_name');
          tbl.boolean('direction_id');
          tbl.integer('block_id');
          tbl.integer('shape_id').references('shapes.shape_id').onDelete('CASCADE').index();
          tbl.specificType('wheelchair_accessible', 'smallint');
          tbl.specificType('bikes_allowed', 'smallint');
          tbl.string('dir_abbr');
          tbl.timestamps(true, true);
        })
      }
    }),
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('trips')
    .dropTable('shape_sequences')
    .dropTable('shapes')
    .dropTable('routes')
};