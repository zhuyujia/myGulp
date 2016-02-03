/**
 * gulp 配置文件
 * 
 * npm install --save-dev gulp gulp-htmlmin gulp-sass gulp-jshint gulp-concat gulp-uglify gulp-clean
 * 
 */

'use strict';

var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean');

// html 处理
gulp.task('html_dev', function(){
    var htmlSrc = './src/*.html',
        htmlDest = './dev/';

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDest));
});

gulp.task('html_publish', function(){
    var htmlSrc = './src/*.html',
        htmlDest = './publish/',
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
gulp.task('css_dev', function(){
    var cssSrc = './src/sass/main.scss',
        cssDest = './dev/css';

    gulp.src(cssSrc)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

gulp.task('css_publish', function(){
    var cssSrc = './src/sass/main.scss',
        cssDest = './publish/css';

    gulp.src(cssSrc)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(cssDest));
});

// js 处理
gulp.task('js_dev', function(){
    var jsSrc = './src/js/*.js',
        jsDest = './dev/js';

    gulp.src(jsSrc)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('js_publish', function(){
    var jsSrc = './src/js/*.js',
        jsDest = './publish/js';

    gulp.src(jsSrc)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

// 图片处理
gulp.task('images_dev', function(){
    var imagesSrc = './src/images/*',
        imagesDest = './dev/images';

    gulp.src(imagesSrc)
        .pipe(gulp.dest(imagesDest));
});

gulp.task('images_publish', function(){
    var imagesSrc = './src/images/*',
        imagesDest = './publish/images';

    gulp.src(imagesSrc)
        .pipe(gulp.dest(imagesDest));
});

// 其他第三方任务
gulp.task('other_dev', function(){
    gulp.src(['./src/!(*.html|sass|images|js)/**'])
        .pipe(gulp.dest('./dev/'));
});

gulp.task('other_publish', function(){
    gulp.src(['./src/!(*.html|sass|images|js)/**'])
        .pipe(gulp.dest('./publish/'));
});

// 清除任务
gulp.task('clean', function(){
    gulp.start('clean_dev', 'clean_publish');
});

gulp.task('clean_dev', function(){
    gulp.src(['./dev/**/*'], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('clean_publish', function(){
    gulp.src(['./publish/**/*'], {read: false})
        .pipe(clean({force: true}));
});

// 监听任务
gulp.task('watch_dev', function(){
    var htmlSrc = 'src/*.html',
        cssSrc = 'src/sass/main.scss',
        jsSrc = 'src/js/*.js';

    gulp.watch(htmlSrc, function(){
        gulp.run('html_dev');
    });

    gulp.watch(cssSrc, function(){
        gulp.run('css_dev');
    });

    gulp.watch(jsSrc, function(){
        gulp.run('js_dev');
    });
});

// 执行任务
gulp.task('dev', ['clean_dev', 'watch_dev'], function(){
    gulp.start('html_dev', 'css_dev', 'js_dev', 'images_dev', 'other_dev');
});

gulp.task('publish', ['clean_publish'], function(){
    gulp.start('html_publish', 'css_publish', 'js_publish', 'images_publish', 'other_publish');
});