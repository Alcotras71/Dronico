const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  del = require("del"),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  notify = require("gulp-notify"),
  plumber = require("gulp-plumber"),
  pug = require("gulp-pug");

gulp.task("pug", function () {
  return gulp
    .src("src/pug/pages/**/*.pug")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Pug",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("build"))
    .pipe(browserSync.stream());
});

gulp.task("scss", function () {
  return gulp
    .src("src/scss/main.scss")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Styles",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 versions"],
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/css/"))
    .pipe(browserSync.stream());
});

gulp.task("copy:images", function () {
  return gulp
    .src("src/images/**/*.*")
    .pipe(gulp.dest("build/images/"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("copy:fonts", function () {
  return gulp
    .src("src/fonts/**/*.*")
    .pipe(gulp.dest("build/fonts/"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("copy:js", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("build/js/"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", function () {
  gulp.watch("src/pug/**/*.pug", gulp.parallel("pug"));
  gulp.watch("src/scss/**/*.scss", gulp.parallel("scss"));

  gulp.watch("src/images/**/**.*", gulp.parallel("copy:images"));
  gulp.watch("src/js/**/**.js", gulp.parallel("copy:js"));
  gulp.watch("src/fonts/**/**.*", gulp.parallel("copy:fonts"));
});

gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "build/",
    },
  });
});

gulp.task("clean:build", function () {
  return del("build/");
});

gulp.task(
  "default",
  gulp.series(
    gulp.parallel("clean:build"),
    gulp.parallel("scss", "pug", "copy:images", "copy:js", "copy:fonts"),
    gulp.parallel("server", "watch")
  )
);

// gulp.task("scss", function () {
//   return gulp
//     .src("app/scss/**/*.scss")
//     .pipe(sass({ outputStyle: "compressed" }))
//     .pipe(
//       autoprefixer({
//         overrideBrowserslist: ["last 8 versions"],
//       })
//     )
//     .pipe(rename({ suffix: ".min" }))
//     .pipe(gulp.dest("app/css"))
//     .pipe(browserSync.reload({ stream: true }));
// });

// gulp.task("css", function () {
//   const arr = ["node_modules/swiper/swiper.scss"];
//   const arr = "";
//   if (arr !== "") {
//     return gulp
//       .src(arr)
//       .pipe(concat("_libs.scss"))
//       .pipe(gulp.dest("app/scss"))
//       .pipe(browserSync.reload({ stream: true }));
//   }
// });

// gulp.task("js", function () {
//   const arr = ["node_modules/swiper/swiper-bundle.js"]
//   const arr = "";
//   if (arr !== "") {
//     return gulp
//       .src()
//       .pipe(concat("libs.min.js"))
//       .pipe(uglify())
//       .pipe(gulp.dest("app/js"))
//       .pipe(browserSync.reload({ stream: true }));
//   }
// });
