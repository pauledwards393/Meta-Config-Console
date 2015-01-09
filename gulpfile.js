
// Dependencies
var gulp = require('gulp');

// Dynamically load gulp plugins included in packages.json
var plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'browser-sync', 'event-stream'],
	replaceString: /\bgulp[\-.]/
});

var reload = plugins.browserSync.reload;
var dest = 'public/';

// Bower JS
gulp.task('bowerjs', function() {

	gulp.src(plugins.mainBowerFiles())
		.pipe(plugins.filter('*.js'))
		.pipe(plugins.concat('main.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(dest));
});

// JS
gulp.task('js', function() {

	var target = gulp.src(['./index.htm']);
	var js = gulp.src(['./app/**/*.js']);

	return target
			.pipe(plugins.inject(js))
			.pipe(gulp.dest('./'))
			.pipe(reload({ stream: true }));
});

// CSS including all Bower CSS
gulp.task('css', function() {

	var cssFromVendors = gulp.src(plugins.mainBowerFiles())
							.pipe(plugins.filter('*.css'));

	var cssFromScss = gulp.src('assets/scss/main.scss')
						.pipe(plugins.rubySass({style: 'compressed'}));

	return plugins.eventStream.concat(cssFromVendors, cssFromScss)
			.pipe(plugins.order(['normalize.css', '*']))
			.pipe(plugins.concat('main.css'))
			.pipe(plugins.minifyCss())
			.pipe(gulp.dest(dest))
			.pipe(reload({ stream: true }));		
});

// Watch files and reload tasks

gulp.task('browser-sync', function() {
	plugins.browserSync({
    	proxy: 'local.meta-config-console.com',
    	notify: false
  	});
});

gulp.task('browser-sync-reload', function() {
	plugins.browserSync.reload();
});

gulp.task('watch', function() {
	gulp.watch('assets/scss/**/*.scss', ['css']);
	gulp.watch('app/**/*.js', ['js']);
	gulp.watch('index.htm', ['browser-sync-reload']);
});

// Default task
gulp.task('default', ['bowerjs', 'js', 'css', 'browser-sync', 'browser-sync-reload', 'watch']);