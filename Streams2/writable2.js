var fs = require('fs'),
    Writable = require('stream').Writable,
    inherits = require('util').inherits;

function onFinish () {
    console.log('Number of bytes: ' + this.bytes);
}

inherits(MyWritable, Writable);

function MyWritable (options) {
    Writable.call(this, options);
    this.bytes = 0;
    this.on('finish', onFinish.bind(this));
}

MyWritable.prototype._write = function (chunk, cb) {
    this.bytes += chunk.length;
    // Do nothing but send it along
    cb(null, chunk);
};

var ws = new MyWritable();

fs.createReadStream('../npm.json').pipe(ws);