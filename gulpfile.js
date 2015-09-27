var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    del = require('del'),
    nodemon = require('gulp-nodemon'),
    source = require('vinyl-source-stream');

gulp.task('clean', function(cb) {
  del(['server/public/apps/myapp/*'], cb);
});

gulp.task('copy', function() {
  return gulp.src('client/index.html')
    .pipe(gulp.dest('server/public/apps'));
});

gulp.task('transform', function () {
  browserify({
    entries: 'client/js/main.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify, { stage: 0})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('server/public/apps/myapp'));
});

gulp.task('default', ['clean', 'transform'], function() {
  gulp.watch('client/**/*', ['transform']);
});

gulp.task('build', ['clean', 'transform']);
