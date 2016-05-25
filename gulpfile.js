var gulp = require('gulp');
var gulpif = require('gulp-if');
var scsslint = require('gulp-scss-lint');
var beautify = require('gulp-beautify');
var path = require('path');
var del = require('del');
var KarmaServer = require('karma').Server;
var $ = require('gulp-load-plugins')({
  pattern: '*'
});

var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js')[environment];

var port = $.util.env.port || 1337;
var src = 'src/';
var srcjs = src+ 'js/';
var dist = 'dist/';

var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

function overwrite(data) {
    "use strict";
    return data.base;
}

gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpackStream(webpackConfig))
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

gulp.task('html', function() {
  return gulp.src(src + 'index.html')
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35728
    }
  });
});

gulp.task('static', function() {
  return gulp.src(src + 'static/**/*')
    .pipe($.size({ title : 'static' }))
    .pipe(gulp.dest(dist + 'static/'));
});

gulp.task('watch', function() {
  gulp.watch(src + 'index.html', ['html']);
  gulp.watch([srcjs+ 'app.ts', srcjs + '/**/*.ts', srcjs + 'templates/*.hbs', src + 'scss/*.scss'], ['scripts']);
});

gulp.task('scss-lint', function() {
    return gulp.src(src+'/scss/*.scss')
        .pipe(scsslint())
        .pipe(gulpif(isProduction, scsslint.failReporter()));
});

gulp.task('beautify', function() {
    gulp.src([srcjs+'/*.ts', srcjs+'/**/*.ts'], {base: './'})
        .pipe(beautify({indentSize: 4}))
        .pipe(gulp.dest(overwrite));
});

gulp.task('clean', function(cb) {
    del([dist]);
    cb();
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('tests', function () {
    gulp.start(['test', 'scss-lint']);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function(){
  gulp.start(['static', 'html','scripts']);
});
