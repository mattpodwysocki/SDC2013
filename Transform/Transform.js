var JSONStream = require('JSONStream'),
	transform = require('through'),
	split = require('split'),
	Stream = require('stream'),
	inherits = require('util').inherits;

inherits(ScreamStream, Stream)

function ScreamStream () {
  this.writable = this.readable = true
}

Object.defineProperties(ScreamStream.prototype, {
	write: {
		value: function (data) {
			var self = this;
			if (data) {
			    data.split(/[^\w]+/).forEach(function (d) {
			    	self.emit('data', d.toUpperCase() + '\r\n')
			    });
			  return true;
			}
		}
	},
	end: {
		value: function () {
			this.emit('end');
		}
	} 
});

var n = 0, js
fs.createReadStream('../npm.json')
  .pipe(JSONStream.parse(['rows', true, 'doc', 'readme']))
  .pipe(new ScreamStream())
  .pipe(process.stdout)