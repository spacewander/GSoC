var path = require('path');
var fs = require('fs');

var dataFile = path.join(__dirname, '../GSoCProjects.json');
var getData = function() {
  var options = {
    encoding: 'utf-8'
  };
  fs.readFile(dataFile, options, function(err, data){
    if (err) {
      throw err;
    }

    return JSON.parse(data);
  });
};

var setData = function(data) {
  
};

module.exports = {
  getData : getData,
  setData : setData
};
