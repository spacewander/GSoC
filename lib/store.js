var path = require('path');
var fs = require('fs');
var jf = require('jsonfile');

var dataFile = path.join(process.cwd(), '/GSoCProjects.json');

var getData = function(cb) {
  var options = {
    encoding: 'utf-8'
  };
  fs.readFile(dataFile, options, function(err, data){
    if (err) {
      console.log(err);
    }

    return cb(JSON.parse(data));
  });
};

var setData = function(data) {
  jf.writeFile(dataFile, data, function(err){
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  getData : getData,
  setData : setData
};
