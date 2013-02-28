var fs = require('fs'),
    JSONStream = require('JSONStream'),
    Transform = require('stream').Transform,
    inherits = require('util').inherits;

inherits(ScreamStream, Transform);

// Create Scream Stream
function ScreamStream () {
    Transform.call(this, {
    lowWaterMark: 0,
    encoding: 'utf8'
    });
}

// Transform the existing data
ScreamStream.prototype._transform = function (chunk, outputFn, callback) {
    outputFn(new Buffer(String(chunk).toUpperCase()));
    callback();
};

fs.createReadStream('../npm.json')
    .pipe(JSONStream.parse(['rows', true, 'doc', 'description']))
    .pipe(new ScreamStream())
    .pipe(process.stdout);

