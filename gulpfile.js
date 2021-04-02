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
  cssMin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  babel = require("gulp-babel"),
  rename = require("gulp-rename");

// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// PUG
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
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
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// SCSS
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
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
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// JS
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
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
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/js/"))
    .pipe(browserSync.reload({ stream: true }));
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// CSS LIBRARIES
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("cssLibs", () => {
  const modules = [
    "node_modules/swiper/swiper-bundle.min.css",
    // "node_modules/rellax/css/main.css",
  ];
  return gulp
    .src(modules)
    .pipe(gulp.dest("build/css/libs/"))
    .pipe(browserSync.reload({ stream: true }));
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// JS LIBRARIES
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("jsLibs", () => {
  const modules = [
    "node_modules/swiper/swiper-bundle.min.js",
    "node_modules/@lottiefiles/lottie-player/dist/lottie-player.js",
    "node_modules/lottie-web/build/player/lottie.js",
    "node_modules/parallax-js/dist/parallax.min.js",
    "node_modules/rellax/rellax.min.js",
    "node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js",
    "loadLibs/fslightbox.min.js",
    "loadLibs/inputmask.min.js",
  ];
  return gulp
    .src(modules)
    .pipe(gulp.dest("build/js/libs/"))
    .pipe(browserSync.reload({ stream: true }));
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// MAPS FOR JS LIBRARIES
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("jsLibsMap", () => {
  const modules = [
    "node_modules/swiper/swiper-bundle.min.js.map",
    "node_modules/@lottiefiles/lottie-player/dist/lottie-player.js.map",
    "node_modules/parallax-js/dist/parallax.min.js.map",
  ];
  return gulp
    .src(modules)
    .pipe(gulp.dest("build/js/libs/"))
    .pipe(browserSync.reload({ stream: true }));
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// COPY IMG
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("img", () => {
  return gulp
    .src("src/images/**/*.*")
    .pipe(gulp.dest("build/images/"))
    .pipe(browserSync.reload({ stream: true }));
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// COPY FONTS, VIDEO, IFRAME, PHP
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("copy:fonts", () => {
  return gulp
    .src("src/fonts/**/*.*")
    .pipe(gulp.dest("build/fonts/"))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task("copy:video", () => {
  return gulp
    .src("src/video/**/*.*")
    .pipe(gulp.dest("build/video/"))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task("copy:iframe", () => {
  return gulp
    .src("src/iframe/**/*.*")
    .pipe(gulp.dest("build/iframe/"))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task("copy:php", () => {
  return gulp
    .src("src/php/**/*.*")
    .pipe(gulp.dest("build/php/"))
    .pipe(browserSync.reload({ stream: true }));
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// WATCH TASK
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("watch", () => {
  gulp.watch("src/pug/**/*.pug", gulp.parallel("pug"));
  gulp.watch("src/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("src/images/**/**.*", gulp.parallel("img"));
  gulp.watch("src/js/**/**.js", gulp.parallel("js"));

  gulp.watch("src/fonts/**/**.*", gulp.parallel("copy:fonts"));
  gulp.watch("src/video/**/**.*", gulp.parallel("copy:video"));
  gulp.watch("src/iframe/**/**.*", gulp.parallel("copy:iframe"));
  gulp.watch("src/php/**/**.*", gulp.parallel("copy:php"));
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// Server
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("server", () => {
  browserSync.init({
    server: {
      baseDir: "build/",
    },
  });
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// Build
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("clean:build", () => {
  return del("build/");
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// Default
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
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
      "copy:video",
      "copy:iframe",
      "copy:php",
      "cssLibs",
      "jsLibs",
      "jsLibsMap"
    ),
    gulp.parallel("server", "watch")
  )
);
