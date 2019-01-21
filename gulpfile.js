const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');

// Static Server
gulp.task('serve', () => {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch("./scss/*.scss", gulp.parallel('sass'));
    gulp.watch("*.html", gulp.parallel('html'));
    gulp.watch("*./font/**/*.*", gulp.parallel('font'));
    gulp.watch("*./img/**/*", gulp.parallel('img'));
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// sass
gulp.task('sass', () => {
    return gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/css/"))
        .pipe(browserSync.stream());
});

gulp.task('html', () => {
    return gulp.src("./*.html")
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.stream());
});

gulp.task('img', () => {
    return gulp.src("*./img/**/*")
        .pipe(gulp.dest("./dist/img"))
        .pipe(browserSync.stream());
});

gulp.task('font', () => {
    return gulp.src("*./font/**/*")
        .pipe(gulp.dest("./dist/font"))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('serve', 'sass', 'html', 'img', 'font'));

 
