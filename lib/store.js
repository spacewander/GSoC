var path = require('path');
var fs = require('fs');

var dataFile = path.join(__dirname, '../GSoCProjects.json');

var getData = function(cb) {
  var options = {
    encoding: 'utf-8'
  };
  fs.readFile(dataFile, options, function(err, data){
    if (err) {
      throw err;
    }

    return cb(JSON.parse(data));
  });
};

var setData = function(data) {
  
};

module.exports = {
  getData : getData,
  setData : setData
};
