
var net = require('net')
var opts = require('optimist').argv
var split = require('split')

var Model = require('scuttlebutt/model')
var chat  = new Model()

var name = opts.name

if(opts.server) {
  console.log('is server');
  net.createServer(function (stream) {
    var addr = stream.remoteAddress
    stream.pipe(chat.createStream()).pipe(stream)
  }).listen(8989)
} else {

  function connect () {

  var stream = net.connect(8989, 'localhost')

  stream.pipe(chat.createStream()).pipe(stream)
    .on('error', function (err) {
      console.log(err);
      console.log('server down')
    })
    .on('close', setTimeout.bind(null, connect, 1000));

  }
  
  connect() 
}

if(!name)
  throw new Error('must provide name')

chat.on('change', function (key, value) {
  console.log(key+':', value)
});

process.stdin
  .pipe(split())
  .on('data', function (message) {
    chat.set(new Date().toUTCString() + ' ' + name, message)
  });

