const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const del = require('del');

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('html', function () {
  return gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  return gulp
    .src('src/sass/**/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('assets', function () {
  return gulp.src('src/assets/**/*').pipe(gulp.dest('dist/assets'));
});

gulp.task('scripts', function () {
  return gulp.src('src/js/**/*').pipe(gulp.dest('dist/js'));
});

gulp.task(
  'build',
  gulp.series('clean', gulp.parallel('html', 'styles', 'scripts', 'assets'))
);
