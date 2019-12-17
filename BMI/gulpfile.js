//Basic setting
var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    pug           = require('gulp-pug'),
    watch         = require('gulp-watch'),
    copy          = require('gulp-copy'),
    changed       = require('gulp-changed'),
    sourcemaps    = require('gulp-sourcemaps'),
    autoprefixer  = require('gulp-autoprefixer'),
    htmlbeautify  = require('gulp-html-beautify'),
    livereload    = require('gulp-livereload'),
    browserSync   = require('browser-sync').create(),
    handleErrors  = require('./src/scripts/util/handleErrors'),
    plumber       = require('gulp-plumber')
    del           = require('del'),
    src           = './src/',
    dest          = './webroot/',
    view          = './';

//Pug setting
var beautifyOptions = {
  indent_size: 2,
  indent_char: ' ',
  unformatted: true,
  extra_liners: []
};

gulp.task('pug', function() {
  return gulp
    .src([
      src + '*.pug',
      src + '_*.pug'
    ])
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .on('error', handleErrors)
    .pipe(htmlbeautify({beautifyOptions}))
    .pipe(gulp.dest(view))
    .pipe(browserSync.stream());
});

//Sass setting
var autoprefixerOptions = {
  browsers: ['last 2 version', '> 5%', 'Firefox ESR', 'Explorer >= 8.0']
};

gulp.task('sass', function() {
  return gulp
    .src([
      src + 'css/**/*.sass',
      '!' + src + 'css/**/_*.sass',
    ])
    .pipe(plumber())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(dest + 'css'))
    .pipe(browserSync.stream());
});

//Copy setting
gulp.task('copy', function() {
  return gulp
    .src([
      src + '**/*',
      '!' + src + 'main',
      '!' + src + 'part',
      '!' + src + 'pages',
      '!' + src + '*.pug',
      '!' + src + '**/_*.pug',
      '!' + src + '**/mixins/',
      '!' + src + '**/mixins/**',
      '!' + src + '**/mixins/*',
      '!' + src + '**/css/**/*.sass',
      '!' + src + '**/css/**/_*.sass',
      '!' + src + '**/css/**/*.scss',
      '!' + src + '**/util/',
      '!' + src + '**/util/*.js'
      ])
    .on('error', handleErrors)
    .pipe(plumber())
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});

//Browser setting
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
});


//Watch setting
gulp.task('watch', function () {
  livereload.listen(),
  gulp.watch(src + '**/*', ['copy']),
  gulp.watch(src + '**/*.sass', ['sass']),
  gulp.watch(src + '**/*.pug', ['pug']),
  gulp.watch(dest, ['browserSync'])
});

gulp.task('default', ['watch', 'copy', 'browserSync']);