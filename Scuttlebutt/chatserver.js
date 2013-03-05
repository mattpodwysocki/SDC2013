var net = require('net'),
    opts = require('optimist').argv,
    split = require('split');

var Model = require('scuttlebutt/model');
var chat  = new Model();

// Get name from the command line arguments
var name = opts.name;

if(opts.server) {
    // I'm the server, so create the stream and pipe the data
    net.createServer(function (stream) {
        stream.pipe(chat.createStream()).pipe(stream);
    }).listen(8989)
} else {

    function connect () {

        var stream = net.connect(8989, 'localhost');

        // Connect to our model with our remote pipe
        stream.pipe(chat.createStream()).pipe(stream)
        .on('error', function (err) {
            console.log(err);
            console.log('server down');
        })
        .on('close', setTimeout.bind(null, connect, 1000)); // Try reconnecting
    }
  
    connect();
}

// I need a name
if(!name) {
    throw new Error('must provide name')
}

chat.on('change', function (key, value) {
    // Print my data
    console.log(key + ':' + value);
});

process.stdin
    .pipe(split())
    .on('data', function (message) {
        // Send my data
        chat.set(new Date().toUTCString() + ' ' + name, message)
    });

