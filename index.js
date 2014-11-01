#! /usr/bin/env node

var yargs = require('yargs')
            .string('n')
            .usage("$0 init \n$0 year [-t tag | -n projectName]")
            .example("$0 init",  "download the project data of GSoC")
            .example("$0 2014", "list projects of specific year")
            .example("$0 2014 -t ruby -t java",  "list projects contain specific tag of given year")
            .example("$0 2014 -n Rails", "search with project name in given year")
            .example("$0 2014 -n Rails -t web", "search with project name and specific tag in given year");

var argv = yargs.argv;
var GSoC = require('./lib/GSoC.js');
var printProjects = require('./lib/print.js').printProjects;

if (argv.h) {
  yargs.showHelp();
  return 0;
}

if (argv._[0] === 'init') {
  GSoC.init();
  return 0;
}

// yargs does not offer feature like 'check if options is Array'
var isArray = function(item) {
  return item && typeof(item) === typeof([]);
};

var year = Number(argv._[0]);
var splits;
if (!year) {
  if (argv._.length) {
    splits = argv._[0].split('-');
    if (splits.length === 2) {
      year = splits;
    }
  }
}

var currentYear = (new Date()).getFullYear();
var fallbackToCurrentYear = function(year) {
  if (!year || year < 2009 || year > currentYear) {
    return currentYear;
  }
  return year;
};

if (isArray(year)) {
  year[0] = fallbackToCurrentYear(Number(year[0]));
  year[1] = fallbackToCurrentYear(Number(year[1]));
  if (year[1] < year[0]) {
    var tmp = year[1];
    year[1] = year[0];
    year[0] = tmp;
  }
}
else {
  year = fallbackToCurrentYear(year);
}

if (argv.t) {
  if (!isArray(argv.t)) {
    argv.t = new Array(argv.t);
  }

  // convert all tags to lowercase
  argv.t.map(function(cur, i, ary){
    ary[i] = ary[i].toLowerCase();
  });
}

if (argv.t && argv.n) {
  GSoC.searchProjectsWithTags(year, argv.n, argv.t, printProjects);
}
else if (argv.t) {
  GSoC.searchTags(year, argv.t, printProjects);
}
else if (argv.n) {
  GSoC.searchProjects(year, argv.n, printProjects);
}
else {
  GSoC.getProjectsList(year, printProjects);
}

