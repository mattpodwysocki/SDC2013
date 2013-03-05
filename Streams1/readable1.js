var Stream = require('stream');

// Every second, yield a value
function createStream () {
    var s = new Stream();
    s.readable = true

    var times = 5;
    var iv = setInterval(function () {

    	if (times-- === 0) {
            s.emit('end');
            clearInterval(iv);
    	} else {
    		s.emit('data', times + '\r\n');
    	}
    }, 1000);

    return s;
}

createStream().pipe(process.stdout);