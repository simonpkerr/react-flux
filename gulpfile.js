'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify'); // bundles js and allows npm modules to be used in browser
var reactify = require('reactify'); // transforms react jsx to js
var source = require('vinyl-source-stream'); //use conventional text streams with gulp
var concat = require('gulp-concat');
var lint = require('gulp-eslint');

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: [
      './src/**/*.js'
    ],
    css: [
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      './node_modules/toastr/toastr.css'
    ],
    images: [
      './src/images/*'
    ],
    dist: './dist',
    mainJs: './src/main.js'
  }
};

gulp.task('connect', function () {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

//the array specifies the open task requires the 'connect' task to run first
gulp.task('open', ['connect'], function () {
  gulp.src('dist/index.html')
    .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function () {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  browserify(config.paths.mainJs) // use browserify to pull in modules from main.js
    .transform(reactify) // transform code from jsx to js
    .bundle() // bundle into 1 file
    .on('error', console.error.bind(console)) // log errors to console
    .pipe(source('bundle.js')) // call the bundle 'bundle.js'
    .pipe(gulp.dest(config.paths.dist + '/scripts')) // copy bundle to dist/scripts folder
    .pipe(connect.reload()); //reload browser
});

gulp.task('css', function () {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function () {
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());
});

gulp.task('lint', function () {
  return gulp.src(config.paths.js)
    .pipe(lint({config: 'eslint.config.json' }))
    .pipe(lint.format());
});

gulp.task('watch', function () {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'css', 'js', 'images', 'lint', 'open', 'watch']);
