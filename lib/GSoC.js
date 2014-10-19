var colors = require('colors');
var _ = require('lodash');
var async = require('async');
var Store = require('./store.js');
var download = require('./download.js');

var init = function() {
  var json = {};
  var currentYear = (new Date()).getFullYear();
  var thatYear = 2009;
  async.whilst(
    function() { return thatYear <= currentYear; },
    function(cb) {
      console.log(('start download the Google Summer of Code\'s projects list for ' + thatYear).cyan);
      download(json, thatYear, function(){
        console.log(('finished download the Google Summer of Code\'s projects list for ' + thatYear).green);
        thatYear += 1;
        cb();
      });
    },
    function(err){
      if (err) {
        throw err;
      }

      Store.setData(json);
    }
  );
};

var buildResult = function(projects, keys) {
  var res = {};
  for (var i = 0; i < keys.length; i++) {
    res[keys[i]] = projects[keys[i]];
  }
  return res;
};

/*
 * filter given array of keys with a name. remain those keys contains the name.
 * case-insentient.
 *
 * @param {Array} keys
 * @param {String} name
 */
var filterKeysWithName = function(keys, name) {
  keys = keys.filter(function(key){
    // case-insentient
    name = name.trim().toLowerCase();
    return name && key.toLowerCase().indexOf(name) != -1;
  });

  return keys;
};

var listName = function(projects, name) {
  return filterKeysWithName(Object.keys(projects), name);
};

/*
 * list projects have **all** given tags
 *
 * @param {Object} tags - tags contains many tags with relative projects
 * @param {Array} tagList - a list of tags
 */
var listTag = function(tags, tagList) {
  var projects;
  if (!tagList || !tagList.length) {
    return [];
  }

  var projectsContainKeys = tags[tagList[0]];
  for (var i = 1; i < tagList.length; i++) {
    // case-insentient
    projects = tags[(tagList[i]).toLowerCase()];
    projectsContainKeys = _.intersection(projectsContainKeys, projects);
  }

  // if tags[tagList[0]] is undefined and tagList.length === 1
  if (!projectsContainKeys) {
    projectsContainKeys = [];
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

var searchProjectsWithTags = function(year, name, tagList, cb) {
  var keys;
  Store.getData(function(data) {
    if (typeof(year) === typeof([])) {
      var thatYear = year[0];
      keys = listTag(data[thatYear].tags, tagList);
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

      keys = filterKeysWithName(keys, name);
      cb(
        buildResult(data[lastYear].projects, keys)
      );
    }
    else {
      keys = filterKeysWithName(listTag(data[year].tags, tagList), name);
      cb( buildResult(data[year].projects, keys));
    }
  });
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
