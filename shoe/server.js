var http = require('http');
var server = http.createServer(require('ecstatic')(__dirname + '/static'));
server.listen(8000);

var shoe = require('shoe');
var sock = shoe(function (stream) {
    stream.pipe(process.stdout, { end : false });
});
sock.install(server, '/sock');