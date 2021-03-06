var Rx = require('rx'),
    Stream = require('stream'),
    JSONStream = require('jsonstream'),
    fs = require('fs'),
    inherits = require('util').inherits;

Stream.prototype.toObservable = function () {
    var self = this;
    return Rx.Observable.create(function (obs) {
        self.on('data', obs.onNext.bind(obs));
        self.on('error', obs.onError.bind(obs));
        self.on('end', function (data) {
            if (data) {
                obs.onNext(data);
            }
            obs.onCompleted();
        });

        return function () {};
    });
};

Stream.prototype.toObserver = function () {
    var self = this;
    return Rx.Observer.create(
        function (data) {
            self.write(data);
        }, 
        function (err) {
            self.emit('error', err);
        },
        function () {
            self.end();
        }
    );
};

Stream.prototype.toSubject = function () {
    return Rx.Subject.create(this.toObserver(), this.toObservable());
};

inherits(NoOpStream, Stream)

function NoOpStream () {
  this.writable = this.readable = true
}

Object.defineProperties(NoOpStream.prototype, {
    write: {
        value: function (data) {
            if (data) {
                this.emit('data', data);
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

var throughStream = new NoOpStream();

var processOutObservable = throughStream.toObservable().publish().refCount();

processOutObservable
    .bufferWithCount(10, 10)
    .scan(0, function (acc, item) {

        var sum = item.reduce(function (acc, doc) {
            var versions = doc.versions || {};
            return acc + Object.keys(versions).length;
        }, 0);

        return sum / item.length;
    })
    .subscribe(function (data) {
        console.log('Average # of versions: ' + data);
    });

fs.createReadStream('../npm.json')
  .pipe(JSONStream.parse(['rows', true, 'doc']))
  .pipe(throughStream);
  //.pipe(process.stdout);