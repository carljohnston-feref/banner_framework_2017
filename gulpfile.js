// Dependencies
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	minify = require('gulp-minify-css'),
	order = require('gulp-order'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	del = require('del');

// HTML task
gulp.task('html', function() {												// Define 'html' task
	return gulp.src('development/**/*.html')								// Set HTML file to compile
	.pipe(gulp.dest('distribution'))										// Duplicate 'index.html' to 'distribution' folder
});

// SASS task
gulp.task('sass', function() {												// Define 'sass' task
	return gulp.src('development/css/**/*.scss')							// Set SASS file to compile
	.pipe(sass())															// Compile SASS to CSS
	.pipe(gulp.dest('development/css'))										// Save 'style.css' in 'development/css' folder
	.pipe(rename({suffix: '.min'}))											// Add '.min' suffix to filename
	.pipe(minify())															// Minify CSS
	.pipe(gulp.dest('development/css'))										// Dupicate 'style.min.css' to 'development/css' folder
	.pipe(gulp.dest('distribution/css'))									// Dupicate 'style.min.css' to 'distribution/css' folder
});

// JS task
gulp.task('js', function() {												// Define 'js' task

	return gulp.src([
		'development/js/**/*.js',											// Set JS file to compile
		'!development/js/ignore/**/*.js',									// Set JS folder to ignore in compile
		'!development/js/scripts.js',										// Set JS file to ignore in compile
		'!development/js/scripts.min.js'									// Set JS file to ignore in compile
	])

	.pipe(order([															// Compile JS files in specific order
		'modules/core.js',													// core.js
		'modules/doubleclick.js',											// doubleclick.js
		'modules/date_switch.js',											// date_switch.js
		'modules/custom_metrics.js',										// custom_metrics.js
		'modules/animation.js',												// animation.js
		'modules/exits.js',													// exits.js
		'modules/remarketing.js',											// remarketing.js
		'scripts/*.js'														// all other scripts
	]))

	.pipe(concat('scripts.js'))												// Concatinate all scripts into one 'scripts.js' file
	.pipe(gulp.dest('development/js'))										// Save 'scripts.js' in 'development/js' folder
	.pipe(rename({suffix: '.min'}))											// Add '.min' suffix to filename
	.pipe(uglify())															// Minify JS
	.pipe(gulp.dest('development/js'))										// Save 'scripts.min.js' to 'development/js'
	.pipe(gulp.dest('distribution/js'))										// Save 'scripts.min.js' to 'distribution/js'
});

// IMG task
gulp.task('img', function() {
	del(['distribution/img/*'])												// Delete 'distribution/img'

	return gulp.src('development/img/**/*.+(png|jpg|gif|svg)')				// Set location of image folder, and file types
	.pipe(imagemin())														// Compress images
	.pipe(gulp.dest('distribution/img'))									// Duplicate images to 'distribution/img' folder
});

// VIDEO task
gulp.task('video', function() {
	del(['distribution/video/*'])											// Delete 'distribution/video'

	return gulp.src('development/video/**/*.+(mp4|webm)')					// Set location of 'video' folder, and file types
	.pipe(gulp.dest('distribution/video'))									// Duplicate videos to 'distribution/video' folder
});

// Clean task
gulp.task('clean', function() {												// Define 'clean' task

	del([
		'development/css/style.css',										// Delete 'style.css' in the 'development' folder
		'development/css/style.min.css'										// Delete 'style.min.css' in the 'development' folder
	])

	del([
		'development/js/scripts.js',										// Delete 'scripts.js' in the 'development' folder
		'development/js/scripts.min.js'										// Delete 'scripts.min.js' in the 'development' folder
	])

	del([
		'distribution/css/*'												// Delete 'distribution/css' folder contents before running 'default' tasks
	])

	del([
		'distribution/js/*'													// Delete 'distribution/js' folder contents before running 'default' tasks
	])
});

// Default task
gulp.task('default', ['clean'], function() {								// Define 'default' task
	gulp.start('html', 'sass', 'js', 'img', 'video');						// Run 'html', 'sass', 'js', 'img', 'video' tasks
});

// Watch task
gulp.task('watch', function() {												// Define 'watch' task
	gulp.watch('development/**/*.html', ['html']);							// Watch for changes in any '.html' files
	gulp.watch('development/css/**/*.scss', ['sass']);						// Watch for changes in 'development/sass' folder
	gulp.watch('development/js/modules/**/*.js', ['js']); 					// Watch for changes in 'development/js' folder
	gulp.watch('development/js/scripts/**/*.js', ['js']); 					// Watch for changes in 'development/js' folder
	gulp.watch('development/img/**/*.+(png|jpg|gif|svg)', ['img']);			// Watch for changes in 'development/img' folder
	gulp.watch('development/video/**/*.+(mp4|webm)', ['video']);			// Watch for changes in 'development/video' folder
});

// Assets task
gulp.task('assets', function() {
	gulp.start('img', 'video');
});