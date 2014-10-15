var Store = require('./store.js');
var daownload = require('./download.js');

/*
 * analyse with given raw data. The result will contains two field:
 * projects: project list with tag array of each project
 * tags: tag list with relative projects array
 *
 * @param {JSON} rawData
 *
 * @return {JSON} data with projects' and 'tags' field
 */ 
var analyse = function(rawData) {
  
};

var init = function() {
  console.log('init');
};

var buildResult = function(projects, keys) {
  var res = {};
  for (var i = 0; i < keys.length; i++) {
    res[keys[i]] = projects[keys[i]];
  }
  return res;
};

var listName = function(projects, name) {
  var keys = Object.keys(projects).filter(function(key){
    name = name.trim().toLowerCase();
    return name && key.toLowerCase().indexOf(name) != -1;
  });
  
  return keys;
};

// {Number or Array with 2 elements} year
// {String} name
// {Array} tags

var searchProjects = function(year, name, cb) {
  Store.getData(function(data) {
    if (typeof(year) === typeof([])) {
      var thatYear = year[0];
      var names = listName(data[thatYear].projects, name);
      var lastYear = year[1];
      var otherNames = [];
      var contains = function(e, i){
          return otherNames.indexOf(names[i]) != -1;
      };

      while (names.length && thatYear != lastYear) {
        thatYear += 1;
        otherNames = listName(data[thatYear].projects, name);
        names = names.filter(contains);
      }

      cb(
        buildResult(data[lastYear].projects, names)
      );
    }
    else {
      cb(
        buildResult(data[year].projects, 
                    listName(data[year].projects, name))
      );
    }
  });
};

var searchProjectsWithTags = function(year, name, tags) {
  var data = Store.getData();
  console.log('year: ' + year + ' name: ' + name + ' tags: ' + tags);
};

var searchTags = function(year, tags) {
  var data = Store.getData();
  console.log('year: ' + year + ' tags: ' + tags);
};

var getProjectsList = function(year) {
  var data = Store.getData();
  console.log('year: ' + year);
};

module.exports = {
  init: init,
  searchProjects: searchProjects,
  searchProjectsWithTags: searchProjectsWithTags,
  searchTags: searchTags,
  getProjectsList: getProjectsList
};
