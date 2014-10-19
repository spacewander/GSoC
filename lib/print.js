var colors = require('colors');

// print the result with given projects
var printProjects = function(projects) {
  // if projects is empty
  if (!Object.keys(projects).length) {
    return console.log('Not result found.'.red);
  }
  for (var key in projects) {
    console.log(key.yellow + ("\n\t: " + projects[key]).cyan);
  }
};

module.exports = {
  printProjects: printProjects
};
