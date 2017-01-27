// Dependencies
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	minify = require('gulp-minify-css'),
	order = require('gulp-order'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	htmlreplace = require('gulp-html-replace'),
	del = require('del');

// HTML task
gulp.task('html', function() {										// Define 'html' task
	return gulp.src('dev/**/*.html')								// Set HTML file to compile
	.pipe(gulp.dest('dist'))										// Duplicate 'index.html' to 'dist' folder
    .pipe(htmlreplace({												// Replace HTML
        'css': 'css/style.min.css',									// Change css href to "css/style.min.css"
        'js': 'js/scripts.min.js'									// Change js src to "js/scripts.min.js"
    }))
    .pipe(gulp.dest('dist/'));										// Set ouptput
});

// SASS task
gulp.task('sass', function() {										// Define 'sass' task
	return gulp.src('dev/css/scss/**/*.scss')						// Set SASS file to compile
	.pipe(sass())													// Compile SASS to CSS
	.pipe(gulp.dest('dev/css'))										// Save 'style.css' in 'dev/css' folder
	.pipe(rename({suffix: '.min'}))									// Add '.min' suffix to filename
	.pipe(minify())													// Minify CSS
	.pipe(gulp.dest('dev/css'))										// Dupicate 'style.min.css' to 'dev/css' folder
	.pipe(gulp.dest('dist/css'))									// Dupicate 'style.min.css' to 'dist/css' folder
});

// JS task
gulp.task('js', function() {										// Define 'js' task

	return gulp.src([
		'dev/js/**/*.js',											// Set JS file to compile
		'!dev/js/ignore/**/*.js',									// Set JS folder to ignore in compile
		'!dev/js/scripts.js',										// Set JS file to ignore in compile
		'!dev/js/scripts.min.js'									// Set JS file to ignore in compile
	])

	.pipe(concat('scripts.js'))										// Concatinate all scripts into one 'scripts.js' file
	.pipe(gulp.dest('dev/js'))										// Save 'scripts.js' in 'dev/js' folder
	.pipe(rename({suffix: '.min'}))									// Add '.min' suffix to filename
	.pipe(uglify())													// Minify JS
	.pipe(gulp.dest('dev/js'))										// Save 'scripts.min.js' to 'dev/js'
	.pipe(gulp.dest('dist/js'))										// Save 'scripts.min.js' to 'dist/js'
});

// IMG task
gulp.task('img', function() {
	del(['dist/img/*'])												// Delete 'dist/img'

	return gulp.src('dev/img/**/*.+(png|jpg|gif|svg)')				// Set location of image folder, and file types
	.pipe(imagemin())												// Compress images
	.pipe(gulp.dest('dist/img'))									// Duplicate images to 'dist/img' folder
});

// VIDEO task
gulp.task('video', function() {
	del(['dist/video/*'])											// Delete 'dist/video'

	return gulp.src('dev/video/**/*.+(mp4|webm)')					// Set location of 'video' folder, and file types
	.pipe(gulp.dest('dist/video'))									// Duplicate videos to 'dist/video' folder
});

// Clean task
gulp.task('clean', function() {										// Define 'clean' task

	del([
		'dev/css/style.css',										// Delete 'style.css' in the 'dev' folder
		'dev/css/style.min.css'										// Delete 'style.min.css' in the 'dev' folder
	])

	del([
		'dev/js/scripts.js',										// Delete 'scripts.js' in the 'dev' folder
		'dev/js/scripts.min.js'										// Delete 'scripts.min.js' in the 'dev' folder
	])

	del([
		'dist/css/*'												// Delete 'dist/css' folder contents before running 'default' tasks
	])

	del([
		'dist/js/*'													// Delete 'dist/js' folder contents before running 'default' tasks
	])
});

// Default task
gulp.task('default', ['clean'], function() {						// Define 'default' task
	gulp.start('html', 'sass', 'js', 'img', 'video');		// Run 'html', 'sass', 'js', 'img', 'video' tasks
});

// Watch task
gulp.task('watch', function() {										// Define 'watch' task
	gulp.watch('dev/**/*.html', ['html']);							// Watch for changes in any '.html' files
	gulp.watch('dev/css/**/*.scss', ['sass']);						// Watch for changes in 'dev/sass' folder
	gulp.watch('dev/js/modules/**/*.js', ['js']); 					// Watch for changes in 'dev/js' folder
	gulp.watch('dev/js/scripts/**/*.js', ['js']); 					// Watch for changes in 'dev/js' folder
	gulp.watch('dev/img/**/*.+(png|jpg|gif|svg)', ['img']);			// Watch for changes in 'dev/img' folder
	gulp.watch('dev/video/**/*.+(mp4|webm)', ['video']);			// Watch for changes in 'dev/video' folder
});

// Assets task
gulp.task('assets', function() {
	gulp.start('img', 'video');
});