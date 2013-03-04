var fs = require('fs'),
    JSONStream = require('JSONStream'),
    Stream = require('stream'),
    inherits = require('util').inherits;

inherits(ScreamStream, Stream)

function ScreamStream () {
  this.writable = this.readable = true
}

ScreamStream.prototype.write = function (data) {
    var self = this;
    if (data) {
        data.split(/[^\w]+/).forEach(function (d) {
            self.emit('data', d.toUpperCase() + '\r\n');
        });
      return true;
    }
    return false;
};

ScreamStream.prototype.end = function () {
    this.emit('end');
};

fs.createReadStream('../npm.json')
  .pipe(JSONStream.parse(['rows', true, 'doc', 'readme']))
  .pipe(new ScreamStream())
  .pipe(process.stdout)