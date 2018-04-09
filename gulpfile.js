const gulp = require('gulp');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const template = require('gulp-template-html');
const replace = require('gulp-replace');
const stripDebug = require('gulp-config-strip-debug');

const path = require('path');

const reload = browserSync.reload;

const dir_src = './src';
const dir_dev = './app';
const dir_prod = './dist';

// 监视文件改动并重新载入
gulp.task('default', ['dev']);

gulp.task('dev', ['template', 'mini_html', 'mini_css', 'mini_js', 'mini_image', 'assets'], function () {
    browserSync({
        server: {
            baseDir: dir_dev
        }
    });

    gulp.watch([dir_src + '/content/*', dir_src + '/templates/*'], ['template'], reload);
    gulp.watch([dir_src + '/css/*.css'], ['mini_css'], reload);
    gulp.watch([dir_src + '/js/*.js'], ['mini_js'], reload);
});

/** 清空目录 **/

gulp.task('clean', function () {
    gulp.src(dir_src + '/app/').pipe(clean({ force: true }));
    gulp.src(dir_src + '/dist/').pipe(clean({ force: true }));
});

/** 产品打包 **/

gulp.task('prod', ['template', 'mini_html', 'mini_css', 'mini_js', 'mini_image', 'assets']);

/** 基本操作 **/

gulp.task('template', function () {
    return gulp.src(dir_src + '/content/*.html')
        .pipe(template(dir_src + '/templates/template.html'))
        .pipe(gulp.dest(dir_dev))
        .pipe(reload({ stream: true }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(dir_prod + '/'));
});

gulp.task('mini_css', function () {
    return gulp.src(dir_src + '/css/*.css')
        .pipe(gulp.dest(dir_dev + '/css/'))
        .pipe(reload({ stream: true }))
        .pipe(cssnano())
        .pipe(gulp.dest(dir_prod + '/css/'));
});

gulp.task('mini_js', function () {
    return gulp.src(dir_src + '/js/*.js')
        .pipe(gulp.dest(dir_dev + '/js/'))
        .pipe(reload({ stream: true }))
        .pipe(stripDebug())
        .pipe(replace('http://localhost:8080/api', 'http://api.startup-autobahn.cn/api'))
        .pipe(uglify())
        .pipe(gulp.dest(dir_prod + '/js/'));
});

gulp.task('mini_html', function () {
    return gulp.src(dir_src + '/*.html')
        .pipe(gulp.dest(dir_dev + '/'))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(dir_prod + '/'));
});

gulp.task('mini_image', function () {
    return gulp.src(dir_src + '/img/**/*')
        .pipe(gulp.dest(dir_dev + '/img/'))
        .pipe(imagemin())
        .pipe(gulp.dest(dir_prod + '/img'));
});

gulp.task('assets', function () {
    return gulp.src(dir_src + '/assets/**/*')
        .pipe(gulp.dest(dir_dev + '/'))
        .pipe(imagemin())
        .pipe(gulp.dest(dir_prod + '/'));
});
