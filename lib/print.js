// print the result with given projects
var printProjects = function(projects) {
  // if projects is empty
  if (!Object.keys(projects).length) {
    return console.log('Not result found.');
  }
  for (var key in projects) {
    console.log(key + "\t\t\t\t: " + projects[key]);
  }
};

module.exports = {
  printProjects: printProjects
};
