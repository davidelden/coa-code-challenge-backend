exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('trips', (tbl) => {
      tbl.unique('trip_id');
    }),
    knex.schema.hasTable('stops').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('stops', (tbl) => {
          tbl.increments('id').primary();
          tbl.integer('stop_id').unique().index();
          tbl.integer('stop_code');
          tbl.string('stop_name');
          tbl.string('stop_desc');
          tbl.float('stop_lat');
          tbl.float('stop_lon');
          tbl.integer('zone_id');
          tbl.string('stop_url');
          tbl.integer('location_type');
          tbl.integer('parent_station');
          tbl.integer('stop_timezone');
          tbl.integer('wheelchair_boarding');
          tbl.string('corner_placement');
          tbl.string('stop_position');
          tbl.string('on_street');
          tbl.string('at_street');
          tbl.integer('heading');
          tbl.timestamps(true, true);
        })
      }
    }),
    knex.schema.hasTable('stop_times').then((exists) => {
      if(!exists) {
        return knex.schema.createTable('stop_times', (tbl) => {
          tbl.increments('id').primary();
          tbl.integer('trip_id').references('trips.trip_id').onDelete('CASCADE').index();
          tbl.string('arrival_time');
          tbl.string('departure_time');
          tbl.integer('stop_id').references('stops.stop_id').onDelete('CASCADE').index();
          tbl.integer('stop_sequence');
          tbl.integer('stop_headsign');
          tbl.integer('pickup_type');
          tbl.integer('drop_off_type');
          tbl.float('shape_dist_traveled');
          tbl.integer('timepoint');
          tbl.timestamps(true, true);
        })
      }
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('stops')
    .dropTable('stop_times')
};