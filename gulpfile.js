var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream')

gulp.task('copy', function() {
  return gulp.src(['client/img/**/*'])
    .pipe(gulp.dest('server/public/mrw/img'))
})

gulp.task('sass', function () {
  gulp.src('./client/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('server/public/mrw/'))
})

gulp.task('transform', function () {
  browserify({
    entries: 'client/js/main.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify, { stage: 0})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('server/public/mrw'))
})

gulp.task('default', ['copy', 'sass', 'transform'], function() {
  gulp.watch('client/**/*', ['transform'])
  gulp.watch('client/sass/**/*.scss', ['sass'])
})

gulp.task('build', ['copy', 'sass', 'transform'])
