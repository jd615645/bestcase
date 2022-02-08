import gulp from 'gulp';
import del from 'del';
import autoprefixer from 'autoprefixer';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

const $ = require('gulp-load-plugins')();

const paths = {
  src: {
    scss: './src/style/scss/*.scss',
    css: './src/style/css/*.css',
    js: './src/js/*.js',
    lib: './src/js/lib/*.js',
    pug: './src/pug/*.pug',
    images: './src/img/*',
    assets: './src/assets/**/*'
  },
  dist: {
    html: './dist',
    style: './dist/style',
    js: './dist/js',
    lib: './dist/js/lib',
    images: './dist/img',
    assets: './dist/assets'
  }
}

export function pug() {
  return gulp.src(paths.src.pug)
    .pipe($.pug())
    .pipe(gulp.dest('./dist'));
}

export function scss() {
  return gulp.src(paths.src.scss)
    .pipe(
      sass({
        outputStyle: 'compressed',
      })
    )
    .pipe($.cleanCss())
    .pipe(gulp.dest(paths.dist.style));
}

export function css() {
  return gulp.src(paths.src.css)
    .pipe($.cleanCss({ compatibility: '*'}))
    .pipe(gulp.dest(paths.dist.style));
}

export function scripts() {
  return gulp.src(paths.src.js)
    .pipe($.babel({
      presets: ['@babel/env']
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.js));
}

export function lib() {
  return gulp.src(paths.src.lib)
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.lib))
}

export function images() {
  return gulp.src(paths.src.images)
    // .pipe($.imagemin())
    .pipe(gulp.dest(paths.dist.images));
}

export function assets() {
  return gulp.src(paths.src.assets)
    .pipe(gulp.dest(paths.dist.assets));
}

export function assetsmin() {
  gulp.src('./src/assets/css/**')
    .pipe($.cleanCss({ compatibility: '*'}))
    .pipe(gulp.dest('./dist/assets/css'));
  gulp.src('./src/assets/js/**')
    .pipe(gulp.dest('./dist/assets/js'));
  gulp.src('./src/assets/img/**')
    // .pipe($.imagemin())
    .pipe(gulp.dest('./dist/assets/img'));

  return gulp.src('./src/assets/plugins/**')
    .pipe(gulp.dest('./dist/assets/plugins'));
}

export function webserver() {
  return gulp
    .src(paths.dist.html)
    .pipe($.webserver({
      port: 8080,
      livereload: true,
      directoryListing: false
    }));
}

export function watch() {
  gulp.watch(paths.src.pug, gulp.series('pug'));
  gulp.watch(paths.src.scss, gulp.series('scss'));
  gulp.watch(paths.src.js, gulp.series('scripts'));
}

export function clean() {
  return del(['dist/**/*']);
}

exports.default = gulp.series(webserver, watch);
exports.build = gulp.series(pug, css, scss, scripts, lib);
exports.prod = gulp.series(
  gulp.series(clean),
  gulp.series(pug, css, scss, scripts, lib),
  gulp.series(assetsmin),
  gulp.series(images),
);
