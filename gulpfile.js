var gulp      = require ('gulp')
    , uglify  = require ('gulp-uglify')
    , rename  = require ('gulp-rename')
    , webpack = require ('gulp-webpack');

gulp.task('uglify', function () {
  return gulp.src('build/linguistic.js')
    .pipe(uglify())
    .pipe(rename('linguistic.min.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack', function () {
  return gulp.src('src/linguistic.js')
    .pipe(webpack({
      entry: './lib/linguistic.js',
      output: {
        path: __dirname + '/build',
        filename: 'linguistic.js',
        library: 'linguistic',
        libraryTarget: 'umd'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function () {
  gulp.watch('lib/**/*.js', ['webpack']);
  gulp.watch('build/*.js', ['uglify']);
});

gulp.task('default', ['webpack', 'uglify', 'watch']);
