var	gulp = require('gulp'),
		gulpLoadPlugins = require('gulp-load-plugins'),
		$ = gulpLoadPlugins(),
		mainBowerFiles = require('main-bower-files'),
		browserSync = require('browser-sync').create(),
		minimist = require('minimist')

var path = {
	source: './src/', 
	webroot: './webroot/',
	tmp: './.tmp/'
}
var envOptions = {
	string: 'env',
	default: { env: 'false' } // develop: false , webroot: true
}
var options = minimist(process.argv.slice(2), envOptions)
// console.log(options)

export function pug() {
	return gulp
		.src([
			path.source + '**/*.pug',
			'!' + path.source + '**/_*.pug'
		])
		.pipe($.plumber())
		.pipe($.pug({
			pretty: true
		}))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream())
}

$.sass.compiler = require('node-sass')
export function style(){
	return gulp.src([
		path.source + '**/*.sass',
		path.source + '**/*.scss'
	])
	.pipe($.plumber())
	.pipe($.sourcemaps.init())
	.pipe($.sass({
		errLogToConsole: true,
		outputStyle: 'nested' // compressed nested
	}).on('error', $.sass.logError))
	// 編譯完成css
	.pipe($.autoprefixer())
	// .pipe($.if(options.env === 'true', $.cleanCss()))
	// .pipe($.if(options.env === 'false', $.sourcemaps.write('.')))
	.pipe(gulp.dest(path.webroot))
	.pipe(browserSync.stream())
}

export function scripts(){
	return gulp.src([
		path.source + '**/*.js'
	])
	.pipe($.sourcemaps.init())
	.pipe($.babel({
		presets: ['@babel/env']
	}))
	// .pipe($.concat('all.js'))
	// .pipe($.if(options.env === 'true', $.uglify({
	// 	compress: {
	// 		drop_console: true
	// 	}
	// })))
	// .pipe($.if(options.env === 'false', $.sourcemaps.write('.')))
	.pipe(gulp.dest(path.webroot))
	.pipe(browserSync.stream())
}

export function images(){
	return gulp
		.src([path.source + 'images/*'])
		.pipe(gulp.dest(path.webroot + 'images'))
}

// 圖片壓縮
export function imageMin(){
	return gulp
		.src([path.source + 'images/*'])
		.pipe($.imagemin())
		.pipe(gulp.dest(path.webroot + 'images'))
}

// JS插件版本控制
export function bower(){
	return gulp.src(mainBowerFiles())
	.pipe($.if(options.env === 'true', $.uglify()))
	.pipe(gulp.dest([path.tmp + 'vendors']))
}

// 輸出JS插件
export function vendorJs(){
	return gulp.src([path.tmp + 'vendors/**/**.js'])
	// .pipe($.concat('vendor.js'))
	.pipe($.if(options.env === 'true', $.uglify()))
	.pipe(gulp.dest(path.webroot + 'scripts'))
}

export function browserTask() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
}

export function clean(){
	return gulp.src([path.tmp, path.webroot], { allowEmpty: true })
		.pipe($.clean())
}

export function watch(){
	gulp.watch([path.source + '**/*.pug'], gulp.series('pug')),
	gulp.watch([path.source + '**/*.sass', path.source + '**/*.scss'], gulp.series('style'))
	gulp.watch([path.source + '**/*.js'], gulp.series('scripts'))
	gulp.watch([path.source + '**/*'], gulp.series('images'))
}

exports.default = gulp.parallel(
  pug, style, bower, vendorJs, scripts, images, watch, browserTask
)

// gulp build --env true
exports.build = gulp.series(
  gulp.series(clean, bower),
  gulp.parallel(pug, style, vendorJs, scripts, imageMin)
)