var _ = require('lodash');
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

/*
 * list projects have **all** given tags
 *
 * @param {Object} tags - tags contains many tags with relative projects
 * @param {Array} tagList - a list of tags
 */
var listTag = function(tags, tagList) {
  var projectsContainKeys = [];
  var projects;
  for (var i = 0; i < tagList.length; i++) {
    projects = tags[tagList[i]];
    if (!projects) {
      return [];
    }
    else {
      projectsContainKeys = _.union(projectsContainKeys, projects);
    }
  }

  return projectsContainKeys;
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
      var contains = function(e){
          return otherNames.indexOf(e) != -1;
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

var searchProjectsWithTags = function(year, name, tags, cb) {
  var data = Store.getData();
  console.log('year: ' + year + ' name: ' + name + ' tags: ' + tags);
};

var searchTags = function(year, tagList, cb) {
  Store.getData(function(data) {
    if (typeof(year) === typeof([])) {
      var thatYear = year[0];
      var keys = listTag(data[thatYear].tags, tagList);
      var lastYear = year[1];
      var otherKeys = [];
      var contains = function(e){
          return otherKeys.indexOf(e) != -1;
      };

      while (keys.length && thatYear != lastYear) {
        thatYear += 1;
        otherKeys = listTag(data[thatYear].tags, tagList);
        keys = keys.filter(contains);
      }

      cb(
        buildResult(data[lastYear].projects, keys)
      );
    }
    else {
      cb(
        buildResult(data[year].projects, 
          listTag(data[year].tags, tagList))
      );
    }
  });
};

var getProjectsList = function(year, cb) {
  var data = Store.getData(function(data){
    if (typeof(year) === typeof([])) {
      var thatYear = year[0];
      var names = Object.keys(data[thatYear].projects);
      var lastYear = year[1];
      var otherNames = [];
      var contains = function(e, i){
          return otherNames.indexOf(names[i]) != -1;
      };

      while (names.length && thatYear != lastYear) {
        thatYear += 1;
        otherNames = Object.keys(data[thatYear].projects);
        names = names.filter(contains);
      }

      cb(
        buildResult(data[lastYear].projects, names)
      );
    }
    else {
      cb(data[year].projects);
    }
  });
};

module.exports = {
  init: init,
  searchProjects: searchProjects,
  searchProjectsWithTags: searchProjectsWithTags,
  searchTags: searchTags,
  getProjectsList: getProjectsList
};
