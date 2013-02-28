var fs = require('fs'),
    JSONStream = require('JSONStream'),
    Transform = require('stream').Transform,
    inherits = require('util').inherits;

inherits(MapStream, Transform);

// Create Map Stream
function MapStream (fn, context) {
    this.mapFn = fn;
    this.mapContext = context;

    Transform.call(this, {
        lowWaterMark: 0,
        encoding: 'utf8'
    });
}

// Transform the existing data
MapStream.prototype._transform = function (chunk, outputFn, callback) {
    try {
        outputFn(this.mapFn.call(this.mapContext, chunk));
        callback();
    } catch (e) {
        callback(e);
    }
};

function mapInput (chunk) {
    return new Buffer(String(chunk).toUpperCase());
}

fs.createReadStream('../npm.json')
    .pipe(JSONStream.parse(['rows', true, 'doc', 'description']))
    .pipe(new MapStream(mapInput))
    .pipe(process.stdout);

