/*
 * node-scp
 * <cam@onswipe.com>
 */
var exec = require('child_process').exec;
var path = require('path');

var scp = module.exports = {};

/*
 * Transfer a file to a remote host
 */
scp.send = function (options, cb) {
  var command = [
    'scp',
    '-r',
    '-P',
    (options.port == undefined ? '22' : options.port),
    '-o "ControlMaster no"', //callback is not fired if ssh sessions are shared
    options.file,
    (options.user == undefined ? '' : options.user+'@') + options.host + ':' + path.join(options.path,path.basename(options.file)),
  ];
  exec(command.join(' '), function (err, stdout, stderr) {
    if (cb) {
      cb(err, stdout, stderr);
    } else {
      if (err) throw new Error(err);
    }
  });
}

/*
 * Grab a file from a remote host
 */
scp.get = function (options, cb) {
  var command = [
    'scp',
    '-r',
    '-P',
    (options.port == undefined ? '22' : options.port),
    '-o "ControlMaster no"', //callback is not fired if ssh sessions are shared
    (options.user == undefined ? '' : options.user+'@') + options.host + ':' + options.file,
    options.path
  ];
  exec(command.join(' '), function (err, stdout, stderr) {
    if (cb) {
      cb(err, stdout, stderr);
    } else {
      if (err) throw new Error(err);
    }
  });
}
