var shoe = require('shoe');
var dnode = require('dnode');

var http = require('http');
var ecstatic = require('ecstatic')(__dirname + '/static');

var server = http.createServer(ecstatic);
server.listen(8000);

var sock = shoe(function (stream) {
    var d = dnode({
        yell : function (s, cb) {
            cb(s.toUpperCase() + '!!!');
        }
    });
    d.pipe(stream).pipe(d);
});

sock.install(server, '/dnode');