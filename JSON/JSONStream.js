var JSONStream = require('JSONStream'),
	fs = require('fs');

fs.createReadStream('../npm.json')
  .pipe(JSONStream.parse(['rows', true, 'doc', 'name']))
  .on('data', console.log);