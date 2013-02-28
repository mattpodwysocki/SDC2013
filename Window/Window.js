var fs = require('fs'),
	JSONStream = require('JSONStream'),
	through = require('through'),
	windowStream = require('window-stream');

var ma = new windowStream.MovingAverage({
	average: 'simple',
	window: new windowStream.EventWindow({ size: 10})
});

fs.createReadStream('../npm.json')
    .pipe(JSONStream.parse(['rows', true, 'doc']))
    .pipe(through(function (doc) {
    	var versions = doc.versions || {};
    	var versionLength = Object.keys(versions).length;
    	console.log(versionLength);
    	this.emit('data', versionLength);
    }))
    .pipe(ma);

ma.on('data', function (data) {
	console.log(data);
});