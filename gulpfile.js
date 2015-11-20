var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	eslint = require('gulp-eslint'),
	livereload = require('gulp-livereload'),
	notify = require('gulp-notify');
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	runSeq = require('run-sequence'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	ngAnnotate = require('gulp-ng-annotate');


/*Live reload task*/
gulp.task('reload', function () {
	livereload.reload();
});

gulp.task('reloadCSS', function () {
	return gulp.src('./public/style.css').pipe(livereload());
});

gulp.task('lintJS', function () {
	return gulp.src(['./browser/js/**/*.js', './server/**/*.js'])
		.pipe(plumber({
			errorHandler: notify.onError("Linting Failed. Check your Gulp process.")
		}))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('buildJS', ['lintJS'], function () {
	return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(babel({presets: ['es2015']}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public'));
});

gulp.task('buildCSS', function () {
	return gulp.src('./browser/scss/**/*.scss')
		.pipe(plumber({
			errorHandler: notify.onError('SASS processing failed! Check your gulp process.')
		}))
		.pipe(sass({outputStyle: 'compressed'})
		.on('error', sass.logError))
		.pipe(autoprefixer('last 2 version'))
		.pipe(rename('style.css'))
		.pipe(gulp.dest('./public'));
});

/* Scripts task: Uglifies, */
// gulp.task('uglify', function(){
// 	gulp.src('browser/js/*.js')
// 	.pipe(uglify())
// 	.pipe(gulp.dest('build/js'));
// });

/*Production Tasks
=========================================*/

gulp.task('buildCSSProduction', function () {
    return gulp.src('./browser/scss/main.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public'));
});

gulp.task('buildJSProduction', function () {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

//////////////////////////////////////////////////

gulp.task('build', function () {
    if (process.env.NODE_ENV === 'production') {
        runSeq(['buildJSProduction', 'buildCSSProduction']);
    } else {
        runSeq(['buildJS', 'buildCSS']);
    }
});

// gulp.task('build', function () {
// 	runSeq(['buildJS', 'buildCSS']);
// });

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
