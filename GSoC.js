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

var searchProjects = function(year, name) {
  data = Store.getData();
  console.log('year: ' + year + ' name: ' + name);
};

var searchProjectsWithTags = function(year, name, tags) {
  data = Store.getData();
  console.log('year: ' + year + ' name: ' + name + ' tags: ' + tags);
};

var searchTags = function(year, tags) {
  data = Store.getData();
  console.log('year: ' + year + ' tags: ' + tags);
};

var getProjectsList = function(year) {
  data = Store.getData();
  console.log('year: ' + year);
};

module.exports = {
  init: init,
  searchProjects: searchProjects,
  searchProjectsWithTags: searchProjectsWithTags,
  searchTags: searchTags,
  getProjectsList: getProjectsList
};
