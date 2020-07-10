const { watch, src, dest, series } = require('gulp');
const   autoprefixer    = require('autoprefixer'),
        sass            = require('gulp-sass'),
        postcss         = require('gulp-postcss'),
        bs              = require('browser-sync').create(),
        webpack         = require('webpack'),
        nodemon         = require('nodemon'),
        build           = require('./build');    

sass.compiler = require('node-sass');

//  globs and paths
const   htmlFile = './app/**/*.html',
        sassGlob = './app/public/styles/**/*.scss',
        jsGlob   = './app/public/scripts/*.js',
        baseDir  = './app';

function styles(){
    return src(sassGlob)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(dest('./app/public/styles'))
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
    watch(sassGlob, series(styles, bsReload));
    watch(jsGlob, series(jsCompile, bsReload));
    watch(htmlFile, bsReload);
};

function startNodemon(cb) {
    let called = false;
    return nodemon({
        script: baseDir + '/bin/www.js',
        watch:  baseDir + '/**/*.js',
    })
    .on('start', function onStart() {
        // ensure start only got called once
        if (!called) { cb(); }
        called = true;
    })
    .on('restart', function onRestart() {
        // reload connected browsers after a slight delay
        console.log('Restarting server...');
        setTimeout(function reload() {
            bs.reload({
                stream: false
            });
        }, 2000);
    });
};

//  browser-sync
function startBrowserSync (){
    bs({
      // proxy the expressjs app and use a different port 
      proxy: 'http://localhost:3000',
      port: 4000,
      files: [cssSrcGlob, jsSrcGlob, htmlSrcGlob]   //  watch main files for changes
    });
};

exports.styles  = styles;
exports.js      = jsCompile;
exports.default = series(startNodemon, watchFiles);
exports.build   = build;