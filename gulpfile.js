var gulp = require('gulp');
var es = require('event-stream');
var ngmin = require('gulp-ngmin');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var cssGlobbing = require('gulp-css-globbing');
var sourceMaps = require('gulp-sourcemaps');

var paths = {
    appJs: ['client/app/app.js', 'client/app/modules/module.js', 'client/app/modules/**/*.js', 'client/app/**/*.js', '!client/app/vendor/**/*.js'],
    appJsViews: ['client/app/**/*.html', '!client/app/widgets/**/*.html'],
    widgetJsViews: ['client/app/widgets/**/*.html'],
    vendorJs: ['client/app/vendor/jquery-2.1.0.min.js', 'client/app/vendor/angular.js', 'client/app/vendor/**/*.js'],
    css: ['client/**/*.scss'],
    staticFiles: ['client/index.html', 'client/assets/fonts/**/*', 'client/assets/images/**/*']
};

var shouldCreateMapFile = false;


//lint js code
gulp.task('lintJs', function () {
    return gulp.src(paths.appJs)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


/**
 * concat all app files and create mapping
 */
function compileAppJs() {

    function appTemplate() {
        return  gulp.src(paths.appJsViews).pipe(templateCache('templates.js', {
            module: 'app'
        }));
    }

    function widgetTemplate() {
        return  gulp.src(paths.widgetJsViews).pipe(templateCache('templates.js', {
            module: 'app',
            root: 'widgets/'
        }));
    }

    function appJs() {
        return gulp.src(paths.appJs, {base: 'app'});

    }

    if(shouldCreateMapFile) {
        return es.merge(appJs(), appTemplate(), widgetTemplate())
            .pipe(sourceMaps.init())
            .pipe(concat('app.min.js'))
            .pipe(sourceMaps.write())
            .pipe(gulp.dest('client/build/javascript/'));
    } else {
        return es.merge(appJs(), appTemplate(), widgetTemplate())
            .pipe(ngmin())
            .pipe(uglify())
            .pipe(concat('app.min.js'))
            .pipe(gulp.dest('client/build/javascript/'));
    }
}
gulp.task('compileAppJs', compileAppJs);


/**
 * concat all vendors and create mapping
 */
function compileVendorJs() {

    if(shouldCreateMapFile) {
        return gulp.src(paths.vendorJs, {base: 'app'})
            .pipe(sourceMaps.init())
            .pipe(concat('vendor.min.js'))
            .pipe(sourceMaps.write())
            .pipe(gulp.dest('client/build/javascript/'));
    } else {
        return gulp.src(paths.vendorJs, {base: 'app'})
            .pipe(concat('vendor.min.js'))
            .pipe(gulp.dest('client/build/javascript/'));
    }
}
gulp.task('compileVendorJs', compileVendorJs);


/**
 * agreagate js compilators
 */
gulp.task('compileJs', ['compileAppJs', 'compileVendorJs']);


/**
 * compile sass to css and minify it
 */
function compileCss() {
    return gulp.src(['client/assets/scss/style.scss'])
        .pipe(cssGlobbing({
            extensions: ['.css', '.scss']
        }))
        .pipe(sass({'errLogToConsole': true}))
        .pipe(minifycss({
            keepSpecialComments: 0
        }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('client/build/stylesheet/'));
}
gulp.task('compileCss', compileCss);

gulp.task('copyStatic', function(){
    gulp.src(['client/index.html']).pipe(gulp.dest('client/build'));
    gulp.src(['client/assets/fonts/**/*']).pipe(gulp.dest('client/build/fonts/'));
    gulp.src(['client/assets/images/**/*']).pipe(gulp.dest('client/build/images/'));
});

gulp.task('buildJs', ['lintJs', 'compileJs']);

// Rerun the task when a file changes
gulp.task('watch', function () {
    shouldCreateMapFile = true;
    compileAppJs();
    compileVendorJs();
    compileCss();

    gulp.watch(paths.appJsViews, ['compileAppJs']);
    gulp.watch(paths.widgetJsViews, ['compileAppJs']);
    gulp.watch(paths.appJs, ['lintJs', 'compileAppJs']);
    gulp.watch(paths.vendorJs, ['compileVendorJs']);
    gulp.watch(paths.css, ['compileCss']);
    gulp.watch(paths.staticFiles, ['copyStatic']);
});

gulp.task('default', ['buildJs', 'compileCss', 'copyStatic']);