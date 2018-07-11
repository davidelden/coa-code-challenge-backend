const fs = require('fs');

// Used to read JSON files from /sources into knex insert() function in /seeds/dev/*_seed.js 
exports.getSeedObjs = (filePath) => JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}));