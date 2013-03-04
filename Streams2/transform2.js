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
    if (chunk) {
        var data = String(chunk);
        data.split(/[^\w]+/).forEach(function (d) {
            outputFn(new Buffer(d.toUpperCase() + '\r\n'));
        });
    }
    callback();
};

fs.createReadStream('../npm.json')
    .pipe(JSONStream.parse(['rows', true, 'doc', 'description']))
    .pipe(new ScreamStream())
    .pipe(process.stdout);