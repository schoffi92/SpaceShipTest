var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    siteconfig = require("./siteconfig.json");

gulp.task('default', function () {
    nodemon({
        script: 'start.js',
        ext: 'js',
        env: {
            PORT:8000,
//            devMode: true,
        },
        ignore: ['./node_modules/**']
    })
    .on("restart", function () {
        console.log("Restarting...");
    });
});

gulp.task('sass', function () {
    var sass = require("gulp-sass");

    return gulp.src("./app/scss/**/*.scss")
        .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
        .pipe(gulp.dest("./public/css"));
});

gulp.task("ts", function () {
    var typescript = require("gulp-tsc");
    var concat = require("gulp-concat");
    var uglify = require("gulp-uglify");

    // Copy JavaScript Files
    gulp.src("./app/js/**/*.js")
        .pipe(gulp.dest("./public/js/"));

    // Compile TypeScript Files
    return gulp.src('./app/script/**/*.ts')
          .pipe(typescript({
              target: "ES5",
              module: "commonjs",
              removeComments: true,
              inlineSources: false,
              sourceMap: false,
          }))
          .pipe(concat('all.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('./public/js/'))
});

gulp.task("view", function () {
    var pug = require("gulp-pug");

    return gulp.src("./app/view/**/[a-zA-Z]*.pug")
        .pipe(pug({
            data: siteconfig
        }))
        .pipe(gulp.dest("./public"));
});

gulp.task("resource", function () {
    return gulp.src("./app/resources/**/*")
        .pipe(gulp.dest("./public/resources/"));
});

gulp.task("clean", function () {
    var clean = require("gulp-clean");

    return gulp.src("public/", {read: false})
        .pipe(clean());
});

gulp.task("test", function () {
    var tslint = require("gulp-tslint");

    gulp.src("./app/script/**/*.ts")
        .pipe(tslint())
        .pipe(tslint.report());
});
