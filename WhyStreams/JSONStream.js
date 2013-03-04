var JSONStream = require('JSONStream'),
	fs = require('fs');

// Get the JSON file, and read each row to get the document module name
fs.createReadStream('../npm.json')
  .pipe(JSONStream.parse(['rows', true, 'doc', 'description']))
  .pipe(process.stdout);