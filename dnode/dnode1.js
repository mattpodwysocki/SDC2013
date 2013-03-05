var net = require('net'),
    dnode = require('dnode');

var server = net.createServer(function (stream) {
    var d = dnode({
        yell : function (s, cb) {
            cb(s.toUpperCase() + '!!!');
        }
    });
    d.pipe(stream).pipe(d);
});
server.listen(8000);

server.on('listening', function () {
    var stream = net.connect(8000);
    var d = dnode();
    d.on('remote', function (remote) {
        remote.yell('hello sdc 2013', function (s) {
            console.log(s);
        });
    });
    d.pipe(stream).pipe(d);
});