'use strict';

let gulp = require('gulp')
    , eslint = require('gulp-eslint')
    , rename = require('gulp-rename')
    , uglify = require('gulp-uglify')
    , replace = require('gulp-replace')
    , sourcemaps = require('gulp-sourcemaps')
    , karma = require('karma').Server
    , source = require('vinyl-source-stream')
    , buffer = require('vinyl-buffer')
    , rollup = require('rollup-stream')
    , buble = require('rollup-plugin-buble');

process.chdir(__dirname);

let bundle = (format) => {
    return rollup({
        entry: 'lib/quilk-frontend-router.js'
        , format: format
        , moduleName: 'QuilkFrontendRouter'
        , plugins: [ buble() ]
        , sourceMap: true
        , useStrict: false
    })
        .pipe(source('quilk-frontend-router.js', './lib'))
        .pipe(buffer())
        .pipe(replace(
            /@@VERSION@@/g
            , require('./package.json').version
        ));
};


gulp.task('cjs', () => {
    return bundle('cjs')
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(rename((path) => {
            path.basename = 'index';
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./'));
});


gulp.task('js', [ 'cjs' ], () => {
    return bundle('umd')
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('jsmin', [ 'js' ], () => {
    return gulp.src('dist/quilk-frontend-router.js')
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify({
            mangle: true
        }))
        .pipe(rename((path) => {
            path.basename += '.min';
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', [
    'jsmin'
]);


gulp.task('default', [
    'build'
]);