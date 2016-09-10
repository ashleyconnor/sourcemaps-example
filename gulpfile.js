var gulp = require('gulp');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('gulp-run-sequence');
var del = require('del');
var serve = require('gulp-serve');

gulp.task('clean', function() {
  return del(['./build']);
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/css'));
});
 
gulp.task('inject', function () {
  var target = gulp.src('./index.html'); 
  var sources = gulp.src(['./build/css/*.css'], {read: false});
 
  return target.pipe(inject(sources,{ignorePath: '/build'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('serve', serve('build'));

gulp.task('default', function(cb) {
  runSequence('clean', 'sass', 'inject', cb);
});