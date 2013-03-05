var fs = require('fs'),
	Stream = require('stream');

var ws = new Stream();
ws.writable = true;
ws.bytes = 0;

// Write our data as we get it
ws.write = function (buf) {
    this.bytes += buf.length;
    return true;
};

// Handle data at the end if we get any, then write total bytes
ws.end = function (buf) {
    if (arguments.length) this.write(buf);
    console.log('Number of bytes: ' + this.bytes.toLocaleString());
};

// Not necessary but good for cleanup
ws.destroy = function () {
    this.writable = false;
};

fs.createReadStream('../npm.json').pipe(ws);