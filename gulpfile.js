const gulp = require( 'gulp' );
const less = require( 'gulp-less' );
const cssmin = require( 'gulp-cssmin' );
const rename = require( 'gulp-rename' );
const jsmin = require( 'gulp-jsmin' );
const browserSync = require( 'browser-sync' ).create();
const autoprefixer = require( 'gulp-autoprefixer' );
const del = require( 'del' );
const notify = require( 'gulp-notify' );
const srcMap = require( 'gulp-sourcemaps');


function prepareStatic() {
    gulp.src( 'images/**/*.*' )
        .pipe( gulp.dest( './build/img' ) )
        .pipe( browserSync.stream() );
    return gulp.src( 'fonts/**/*.*' )
        .pipe( gulp.dest( './build/fonts' ) )
        .pipe( browserSync.stream() );
}

function compileCss() {
    return gulp.src( './less/style.less' )
        .pipe(srcMap.init())
        .pipe( less() ).on( 'error', notify.onError() )
        .pipe( cssmin() )
        .pipe( autoprefixer( {
            cascade: false,
        } ) )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( srcMap.write('.'))
        .pipe( gulp.dest( './build/css' ) )
        .pipe( browserSync.stream() );
};

function compileJs() {
    return gulp.src( './js/**/*.js' )
        .pipe( jsmin() )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( gulp.dest( './build/js/' ) )
        .pipe( browserSync.stream() );
};

function clear( done ) {
    del.sync( [ 'build/*' ] );
    return done();
}

function watch() {
    browserSync.init( {
        server: {
            baseDir: './',
        },
    } );

    gulp.watch( './less/**/*.less', compileCss );
    gulp.watch( './js/**/*.js', compileJs );
    gulp.watch( [ './images/**/*.*', './fonts/**/*.*' ], prepareStatic );
    gulp.watch( './index.html', browserSync.reload() );
}

gulp.task( 'clear', clear );
gulp.task( 'prepare-static', prepareStatic );
gulp.task( 'compile-css', compileCss );
gulp.task( 'compile-js', compileJs );
gulp.task( 'watch', watch );

exports.build = gulp.series( gulp.parallel( 'prepare-static', 'compile-css', 'compile-js' ), 'watch' );

