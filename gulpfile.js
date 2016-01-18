/**
 * gulp 配置文件
 * 
 * npm install --save-dev gulp gulp-htmlmin gulp-sass gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-rename gulp-clean
 * 
 * gulp-htmlmin: https://github.com/jonschlinkert/gulp-htmlmin
 * gulp-sass: https://github.com/dlmanning/gulp-sass
 * gulp-autoprefixer: https://github.com/sindresorhus/gulp-autoprefixer
 * gulp-minify-css: https://github.com/murphydanger/gulp-minify-css
 * gulp-jshint: https://github.com/spalger/gulp-jshint
 * gulp-concat: https://github.com/contra/gulp-concat
 * gulp-uglify: https://github.com/terinjokes/gulp-uglify
 * gulp-rename: https://github.com/hparra/gulp-rename
 * gulp-clean: https://github.com/peter-vilja/gulp-clean
 */

'use strict';

var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');

// html 处理
gulp.task('html', function(){
    var htmlSrc = './src/*.html',
        htmlDest = './dist/',
        opts = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        };

    gulp.src(htmlSrc)
        .pipe(htmlmin(opts))
        .pipe(gulp.dest(htmlDest));
});

// css 处理
gulp.task('css', function(){
    var cssSrc = './src/sass/*.scss',
        cssDest = './dist/css';

    gulp.src(cssSrc)
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest(cssDest))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCss())
        .pipe(gulp.dest(cssDest));
});

// js 处理
gulp.task('js', function(){
    var jsSrc = './src/js/*.js',
        jsDest = './dist/js';

    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

// 图片处理
gulp.task('images', function(){
    var imagesSrc = './src/images/*',
        imagesDest = './dist/images';

    gulp.src(imagesSrc)
        .pipe(gulp.dest(imagesDest));
});

// 清除任务
gulp.task('clean', function(){
    gulp.src(['./dist/*.html', './dist/css', './dist/js', './dist/images'], {read: false})
        .pipe(clean());
});

// 监听任务
gulp.task('watch', function(){
    var htmlSrc = './src/*.html',
        cssSrc = './src/sass/*.scss',
        jsSrc = './src/js/*.js';

    gulp.watch(htmlSrc, function(){
        gulp.run('html');
    });

    gulp.watch(cssSrc, function(){
        gulp.run('css');
    });

    gulp.watch(jsSrc, function(){
        gulp.run('js');
    });
});

// 默认任务
gulp.task('default', ['watch'], function(){
    gulp.start('html', 'css', 'js', 'images');
});