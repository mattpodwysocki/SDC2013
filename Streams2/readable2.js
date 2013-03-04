var Readable = require('stream').Readable,
    inherits = require('util').inherits;

function pushValue (value, context) {
    setTimeout((function () {
        this.push(value);
    }).bind(context), 1000);    
}

inherits(YieldStream, Readable);

function YieldStream (options) {
  Readable.call(this, options);
  this._times = 5;
}

YieldStream.prototype._read = function(n) {
    // Determine where we are in the countdown
    switch (this._times--) {
        case 0:
            // Push null when done!
            pushValue(null, this);
            break;
        default:
            // Push the countdown value
            pushValue(this._times + '\r\n', this);
            break;
    }
};

var ys = new YieldStream();

// Keep reading until null
ys.on('readable', function() {
    var chunk;
    while (null !== (chunk = ys.read())) {
        console.log('chunk %j', chunk.toString());
    }
});

ys.read(0 /* needed for now */);

//ys.pipe(process.stdout);