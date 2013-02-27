var fs = require('fs'),
	JSONStream = require('JSONStream'),
	windowStream = require('window-stream');

var ev = new windowStream.EventWindow({ size: 10});

var ma = new windowStream.MovingAverage({
	average: 'simple',
	window: ev
});

fs.createReadStream('../npm.json')
    .pipe(JSONStream.parse(['rows', true, 'doc', 'description']))
    .pipe(ma);

ma.on('data', function (data) {
	console.log(Object(data));
});




