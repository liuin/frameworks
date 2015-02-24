/*
 * gulp指令集合
 * $ npm install gulp --save-dev
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 * npm install amd-optimize --save-dev
 * */

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var amdOptimize = require('amd-optimize');
var requirejsOptimize = require('gulp-requirejs-optimize');
var rjs = require('gulp-requirejs');

// 检查脚本
/*
 gulp.task('lint', function() {
 gulp.src('./js/*.js')
 .pipe(jshint())
 .pipe(jshint.reporter('default'));
 });
 */

// 编译Sass
/*
 gulp.task('sass', function() {
 gulp.src('./scss/*.scss')
 .pipe(sass())
 .pipe(gulp.dest('./css'));
 });
 */

//压缩CSS
gulp.task('styles', function () {
  return gulp.src(['asset/normalize/normalize-v3.css', 'asset/font-awesome/font-awesome-min.css', 'asset/cukiui/effect.css', 'temp/moblie-app1/css/css.css'])
    .pipe(minifycss())
    .pipe(concat("css.css"))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({message: 'styles task complete'}));
});

//js压缩
gulp.task('script', function () {
  return gulp.src(['js/jquery-1.10.1.min.js', 'js/idangerous.swiper-2.1.min.js', 'js/script.js'])
    .pipe(concat("js.js"))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({message: 'script task complete'}));
});

gulp.task('requirejsBuild', function () {
  rjs({
    name: 'app',
    baseUrl: 'temp/moblie-app1/js/',
    out: 'app.js',
    shim: {
      // standard require.js shim options
    },
    paths: {
      jquery: '../../../asset/jquery/jquery-1.11.2',
      blockShowHide: '../../../asset/cukiui/blockShowHide',
      transition: '../../../asset/cukiui/transition',
      resload: '../../../asset/cukiui/resload'
    }
    // ... more require.js options
  })
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({message: 'requirejsBuild task complete'})); // pipe it to the output DIR
});

//导出HTML
gulp.task('fileOutput', function () {
  return gulp.src(['temp/moblie-app1/demo.html', 'temp/moblie-app1/inpage.html'])
    .pipe(gulp.dest('dist/'))
    .pipe(notify({message: 'html task complete'}));
});

//压缩图片
gulp.task('images', function () {
  return gulp.src('images/**/*')
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({message: 'Images task complete'}))
});

//清除任务
gulp.task('clean', function (cb) {
  del(['dist/css/*', 'dist/js/*', 'dist/img/*'], cb)
});


// 默认任务
gulp.task('default', ['clean'], function () {
  //gulp.start('styles','script','images');
  gulp.start('styles', 'requirejsBuild','fileOutput');
});
