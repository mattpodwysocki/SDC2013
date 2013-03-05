var shoe = require('shoe');
var dnode = require('dnode');

var result = document.getElementById('result');
var stream = shoe('/dnode');

var d = dnode();
d.on('remote', function (remote) {
    remote.yell('hello sdc 2013', function (s) {
        result.textContent = s;
    });
});
d.pipe(stream).pipe(d);