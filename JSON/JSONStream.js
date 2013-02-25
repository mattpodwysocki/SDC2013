var JSONStream = require('JSONStream')

var fs      = require('fs')
var split   = require('split')
var through = require('through')
var request = require('request')

var n = 0, js
fs.createReadStream('../npm.json')
  .pipe(JSONStream.parse(['rows', true, 'doc', 'name']))
  .on('data', console.log)