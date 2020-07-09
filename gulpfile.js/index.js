const { watch, src, dest, series } = require('gulp');
const   autoprefixer    = require('autoprefixer'),
        sass            = require('gulp-sass'),
        postcss         = require('gulp-postcss'),
        bs              = require('browser-sync').create(),
        webpack         = require('webpack');    

sass.compiler = require('node-sass');

//  globs and paths
const   htmlFile = './app/**/*.html',
        sassGlob = './app/assets/styles/**/*.scss',
        jsGlob   = './app/assets/scripts/**/*.js';

function styles(){
    return src(sassGlob)
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

function bsReload(cb){
    bs.reload();
    cb();
};

function watchFiles(){
    bs.init({
        server: './app'
        });
    watch(sassGlob, styles);
    watch(jsGlob, series(jsCompile, bsReload));
    watch(htmlFile, bsReload);
};

exports.styles  = styles;
exports.js      = jsCompile;
exports.default = watchFiles;