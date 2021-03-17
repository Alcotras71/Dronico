const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  del = require("del"),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  notify = require("gulp-notify"),
  plumber = require("gulp-plumber"),
  pug = require("gulp-pug"),
  imageMin = require("gulp-imagemin"),
  cssMin = require("gulp-minify-css"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename");

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
gulp.task("scss", () => {
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
    .pipe(cssMin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/css/"))
    .pipe(browserSync.stream());
});
gulp.task("js", () => {
  return gulp
    .src("src/js/**/*.js")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Js",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/js/"))
    .pipe(browserSync.reload({ stream: true }));
});


gulp.task("cssLibs", () => {
  const modules = ["node_modules/swiper/swiper-bundle.min.css"];
  return gulp
    .src(modules)
    .pipe(gulp.dest("build/css/libs/"))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task("jsLibs", () => {
  const modules = [
    "node_modules/swiper/swiper-bundle.min.js",
    "node_modules/swiper/swiper-bundle.min.js.map",
  ];
  return gulp
    .src(modules)
    .pipe(gulp.dest("build/js/libs/"))
    .pipe(browserSync.reload({ stream: true }));
});


gulp.task("img", () => {
  return gulp
    .src("src/images/**/*.*")
    .pipe(gulp.dest("build/images/"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("copy:fonts", () => {
  return gulp
    .src("src/fonts/**/*.*")
    .pipe(gulp.dest("build/fonts/"))
    .pipe(browserSync.reload({ stream: true }));
});


gulp.task("watch", () => {
  gulp.watch("src/pug/**/*.pug", gulp.parallel("pug"));
  gulp.watch("src/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("src/images/**/**.*", gulp.parallel("img"));
  gulp.watch("src/js/**/**.js", gulp.parallel("js"));

  gulp.watch("src/fonts/**/**.*", gulp.parallel("copy:fonts"));
});

gulp.task("server", () => {
  browserSync.init({
    server: {
      baseDir: "build/",
    },
  });
});

gulp.task("clean:build", () => {
  return del("build/");
});

gulp.task(
  "default",
  gulp.series(
    gulp.parallel("clean:build"),
    gulp.parallel(
      "scss",
      "pug",
      "img",
      "js",
      "copy:fonts",
      "cssLibs",
      "jsLibs"
    ),
    gulp.parallel("server", "watch")
  )
);
