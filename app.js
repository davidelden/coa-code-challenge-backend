const express = require('express');
const app = express();
const { postgraphile } = require('postgraphile');

app.use(postgraphile(process.env.DATABASE_URL, 'public', {graphiql: true, disableDefaultMutations: true}));

module.exports = app;