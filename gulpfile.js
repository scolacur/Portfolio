var gulp = require('gulp'),
	 uglify = require('gulp-uglify'),
	 sass = require('gulp-sass'),
	 eslint = require('gulp-eslint'),
	 rename = require('gulp-rename');

/* Scripts task: Uglifies, */
gulp.task('scripts', function(){
	gulp.src('js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});


//Styles task
gulp.task('styles', function(){
	gulp.src('scss/**/*.scss') //finds all nested children
	.pipe(sass({
		outputStyle: 'compressed',
		errLogToConsole: true
	}))
	.pipe(rename('style.css'))
	.pipe(gulp.dest('/public'));
});


/*Watch Task: Watches JS*/
gulp.task('watch', function(){
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('scss/**/*.scss', ['styles']);
});


//Default Task
gulp.task('default', ['scripts', 'styles', 'watch']);
