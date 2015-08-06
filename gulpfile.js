var gulp = require('gulp'),	
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');
 
gulp.task('concat-src',function(){
	gulp.src(['./js/app/*.js',  './js/app/**/*.js'])
		.pipe(concat('flexitoast.js'))
		.pipe(gulp.dest('./dist/scripts'))
		.pipe(concat('flexitoast.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/scripts'));
});

gulp.task('watch', function(){
	gulp.watch('./js/app/*.js', ['concat-src']);
});

gulp.task('default', ['watch', 'concat-src']);