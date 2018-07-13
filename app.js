const express = require('express');
const app = express();
const { postgraphile } = require('postgraphile');

app.use(postgraphile('postgres://localhost:5432/coa_gtfs_cap_metro_data', 'public', {graphiql: true}));

app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));