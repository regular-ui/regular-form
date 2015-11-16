var gulp = require('gulp');
var Server = require('karma').Server;
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require("gulp-rename");
var plumber = require('gulp-plumber');
var path = require('path');
var through = require('through2');
var pkg = require("./package.json");

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './src');

var sourceFiles = [
    path.join(sourceDirectory, '/*.js')
];

var libraryName = 'RegularForm';
var libraryName1 = 'regular-form';

function wrap(fn) {
    return through.obj(fn);
}

function signatrue(file, enc, cb) {
    var sign = '/**\n' + '@author\t' + pkg.author + '\n' + '@version\t' + pkg.version +
        '\n' + '@homepage\t' + pkg.homepage + '\n*/\n';
    file.contents = Buffer.concat([new Buffer(sign), file.contents]);
    cb(null, file);
}


// webpack config
var wpOptions = {
    output: {
        filename: libraryName1 + ".js",
        path: __dirname,
        library: libraryName,
        libraryTarget: "umd"
    },
    externals: {
        "regularjs": "Regular"
    }
};

/**
 * Run test once and exit
 */
gulp.task('test', ['jshint-src'], function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

/**
 * Run test once and exit
 */
gulp.task('build', ['jshint-src'], function () {
    return gulp.src('src/index.js')
        .pipe(webpack(wpOptions))
        .pipe(wrap(signatrue))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify())
        .pipe(wrap(signatrue))
        .pipe(rename(libraryName1 + '.min.js'))
        .pipe(gulp.dest('dist/'))
        .on("error", function (err) {
            throw err
        });
});

/**
 * Validate source JavaScript
 */

gulp.task('jshint-src', function () {
    return gulp.src(sourceFiles)
        .pipe(plumber())
        .pipe(jshint({
            reporter: 'default'
        }))
});

/**
 * Watch task
 */
gulp.task('watch', function () {
    // Watch JavaScript files
    gulp.watch(sourceFiles, ['jshint-src']);
});
