var fs = require('fs'),
	JSONStream = require('JSONStream'),
	EventWindow = require('window-stream').EventWindow;

var ev = new EventWindow({ size: 10});

// Calculate mean
ev.on('data', function (data) {
	console.log(data.length);
});

fs.createReadStream('../npm.json')
    .pipe(JSONStream.parse(['rows', true, 'doc', 'description']))
    .pipe(ev);






