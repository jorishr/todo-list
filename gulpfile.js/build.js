const { watch, src, dest, series, parallel } = require('gulp');
const   autoprefixer    = require('autoprefixer'),
        sass            = require('gulp-sass'),
        postcss         = require('gulp-postcss'),
        cssnano         = require('cssnano')
        gulpMinHtml     = require('gulp-minify-html'),
        del             = require('del'),
        babel           = require('gulp-babel'),
        uglify          = require('gulp-uglify'),
        replace         = require('gulp-replace');

//  globs and paths
const   htmlGlob = './app/**/*.html',
        sassGlob = './app/public/styles/**/*.scss',
        jsGlob   = './app/public/scripts/tmp/*.js',
        appFiles = ['./app/!(public)**/*.js', './app/*.js']
        baseDir  = './app',
        distDir  = './dist';

async function startClean(){
    const deletedPaths = await del('./dist');
    console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
};

function compileCSS(){
    return src(sassGlob)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer, cssnano]))
        .pipe(dest(distDir + '/public/styles'))
};

function jsCompile(){
    return src(jsGlob)
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(dest(distDir + '/public/scripts'));
};

function minifyHtml(){
    return src (htmlGlob, { base: './app/' })
    .pipe(replace('scripts/tmp/', 'scripts/'))
    .pipe(gulpMinHtml())
    .pipe(dest(distDir));
};

function buildAppFiles(){
    return src(appFiles, { base: './app/' })
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(dest(distDir));
}

function copyWebfonts(){
    return src('./app/public/styles/vendor/webfonts/*', { base: './app' })
    .pipe(dest(distDir));
};

module.exports = series(
    startClean,
    parallel(
        compileCSS, jsCompile, buildAppFiles, minifyHtml, copyWebfonts
    )
);