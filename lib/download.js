var request = require('request');
var async = require('async');
var _ = require('lodash');

/**
 * download json data of projects in GSoC with given year
 *
 * @param {Number} year - the given year of GSoC
 */
var download = function(json, year, cb) {
  var next = '';
  
  json[year] = {};
  async.whilst(
    function() { return next != 'done'; },
    function(callback) {
      var options = {
        url: 'https://www.google-melange.com/gsoc/org/list/public/google/gsoc' + 
          year + '?fmt=json&limit=100' + '&start=' + next,
        json: true
      };
      //console.log('Request with url: ' + options.url);
      request(options, function (error, res, body) {
        try {
          if (error) {
            throw error;
          }
          if (res.statusCode === 200 || res.statusCode === 304) {
            _.merge(json[year], analyse(body.data[next]), function(a, b){
              return _.isArray(a) ? _.union(a, b) : undefined;
            });
            next = body.next;
          }
          else {
            console.log('Request failed with statusCode: ' + res.statusCode);
          }
          callback();
        } catch (e) {
          console.log(e);
          throw e;
        }
      });
    },
    function(err) {
      if (err) {
        throw err;
      }

      cb();
    }
  );
};

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
  var data = {};
  var projects = {};
  var tags = {};
  var project;

  rawData.forEach(function(e){
    project = e.columns.name;
    projects[project] = e.columns.tags.split(', ');
    projects[project].forEach(function(el){
      el = el.toLowerCase();
      if (Array.isArray(tags[el])) {
        tags[el].push(project);
      }
      else {
        tags[el] = new Array(project);
      }
    });
  });
  data.projects = projects;
  data.tags = tags;

  return data;
};

module.exports = download;
