const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const del = require('del');

// Очистка папки dist
gulp.task('clean', function () {
  return del(['dist']);
});

// HTML
gulp.task('html', function () {
  return gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

// Стили
gulp.task('styles', function () {
  return gulp
    .src('src/sass/**/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

// Сторонние стили (если используешь например bootstrap)
gulp.task('css-libs', function () {
  return gulp.src('src/css/**/*.css').pipe(gulp.dest('dist/css'));
});

// JS
gulp.task('scripts', function () {
  return gulp.src('src/js/**/*').pipe(gulp.dest('dist/js'));
});

// Шрифты
gulp.task('fonts', function () {
  return gulp.src('src/assets/fonts/**/*').pipe(gulp.dest('dist/assets/fonts'));
});

// Иконки
gulp.task('icons', function () {
  return gulp.src('src/assets/icons/**/*').pipe(gulp.dest('dist/assets/icons'));
});

// Изображения
gulp.task('images', function () {
  return gulp.src('src/assets/img/**/*').pipe(gulp.dest('dist/assets/img'));
});

// Финальная сборка
gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel(
      'html',
      'styles',
      'css-libs',
      'scripts',
      'fonts',
      'icons',
      'images'
    )
  )
);
