var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	eslint = require('gulp-eslint'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	runSeq = require('run-sequence'),
	concat = require('gulp-concat'),
	babel = require('gulp-babel'),
	autoprefixer = require('gulp-autoprefixer');

/*Live reload task*/
gulp.task('reload', function () {
	livereload.reload();
});

gulp.task('reloadCSS', function () {
	return gulp.src('./public/style.css').pipe(livereload());
});

gulp.task('buildCSS', function () {
	return gulp.src('./browser/scss/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer('last 2 version'))
		.pipe(rename('style.css'))
		.pipe(gulp.dest('./public'));
});

gulp.task('buildJS', ['lintJS'], function () {
	return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(babel({presets: ['es2015']}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public'));
});

gulp.task('lintJS', function () {
	return gulp.src(['./browser/js/**/*.js', './server/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

/* Scripts task: Uglifies, */
// gulp.task('uglify', function(){
// 	gulp.src('browser/js/*.js')
// 	.pipe(uglify())
// 	.pipe(gulp.dest('build/js'));
// });

gulp.task('build', function () {
	runSeq(['buildJS', 'buildCSS']);
});

//Default Task
gulp.task('default', function(){
	livereload.listen();
	gulp.start('build');

	gulp.watch('browser/js/**', function () {
		runSeq('buildJS', 'reload');
	});

	gulp.watch('browser/scss/**', function () {
		runSeq('buildCSS', 'reloadCSS');
	});

	gulp.watch('server/**/*.js', ['lintJS']);

	// Reload when a template (.html) file changes.
	gulp.watch(['browser/**/*.html', 'server/app/views/*.html'], ['reload']);
});
