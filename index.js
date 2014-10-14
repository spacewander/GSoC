#! /usr/bin/env node

var yargs = require('yargs')
            .string(['t', 'n'])
            .usage("$0 init \n$0 year [-t tag | -n projectName]")
            .example("$0 init",  "download the project data of GSoC")
            .example("$0 2014", "list projects of specific year")
            .example("$0 2014 -t ruby -t java",  "list projects contain specific tag of given year")
            .example("$0 2014 -n Rails", "search with project name in given year")
            .example("$0 2014 -n Rails -t web", "search with project name and specific tag in given year");

var argv = yargs.argv;
var GSoC = require('./GSoC.js');

if (argv.h) {
  yargs.showHelp();
  return 0;
}

if (argv._[0] === 'init') {
  GSoC.init();
  return 0;
}

var year = Number(argv._[0]);
var currentYear = (new Date()).getFullYear();
if (!year || year < 2009 || year > currentYear) {
  year = currentYear;
}

if (argv.t && argv.n) {
  GSoC.searchProjectsWithTags(year, argv.n, argv.t);
}
else if (argv.t) {
  GSoC.searchTags(year, argv.t);
}
else if (argv.n) {
  GSoC.searchProjects(year, argv.n);
}
else {
  GSoC.getProjectsList(year);
}
