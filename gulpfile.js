var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  tests: ['./test/**/*.js', '!test/{temp,temp/**}', '!test/fixtures/*'],
  source: ['./lib/**/*.js', './index.js']
};

gulp.task('test', function (cb) {
  gulp.src(paths.source)
    .pipe(plugins.istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(paths.tests)
        .pipe(plugins.mocha())
        .pipe(plugins.istanbul.writeReports()); // Creating the reports after tests runned
    });
});

gulp.task('default', ['test']);
