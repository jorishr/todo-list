const { watch, src, dest, series } = require('gulp');
const   autoprefixer    = require('autoprefixer'),
        sass            = require('gulp-sass'),
        postcss         = require('gulp-postcss'),
        bs              = require('browser-sync').create(),
        webpack         = require('webpack');    

sass.compiler = require('node-sass');

//  files
const htmlFiles = './app/**/*.html';
const sassFiles = './app/assets/styles/**/*.scss';
const jsFiles   = './app/assets/scripts/**/*.js';

function styles(){
    return src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(dest('./app/'))
        .pipe(bs.stream());
};

function jsCompile(cb){
    webpack(require('../webpack.config.js'), function(err, stats){
        if (err){console.log(err.toString());};
        console.log(stats.toString());  
        cb();       // make gulp aware task is done
    });
};

function watchFiles(){
    bs.init({
        server: './app'
        });
    watch(sassFiles, styles);
    watch(jsFiles, series(jsCompile, bs.reload));
    watch(htmlFiles).on('change', bs.reload);
};

exports.styles  = styles;
exports.js      = jsCompile;
exports.default = watchFiles;