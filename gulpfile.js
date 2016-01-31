var config = require("config");
var path = require("path");
var gulp = require("gulp");
var gulpJade = require("gulp-jade");
var gulpCompass = require("gulp-compass");
var gulpImagemin = require("gulp-imagemin");

var JADE_SRC = path.join(__dirname, config.dir.assetsJade, "**", "*.jade");
var JADE_DEST = path.join(__dirname, config.dir.build);
var IMG_SRC = path.join(__dirname, config.dir.assetsImg, "**", "*");
var IMG_DEST = path.join(__dirname, config.dir.buildImg);
var SCSS_SRC_DIR = path.join(__dirname, config.dir.assetsSass);
var SCSS_SRC = path.join(SCSS_SRC_DIR, "**", "*.scss");
var CSS_DEST = path.join(__dirname, config.dir.buildCss);
var CSS_DEV_DEST = path.join(__dirname, config.dir.devCss);
var FONT_SRC = path.join(__dirname, config.dir.assetsFont);
var FONT_DEST = path.join(__dirname, config.dir.buildFont);

gulp.task("jade", function () {
  return gulp
    .src(JADE_SRC)
    .pipe(gulpJade())
    .pipe(gulp.dest(JADE_DEST));
});

gulp.task("image", function () {
  return gulp
    .src(IMG_SRC)
    .pipe(gulpImagemin({
      progressive: true,
      optimizationLevel: config.gulp.image.optimizationLevel
    }))
    .pipe(gulp.dest(IMG_DEST))
});

gulp.task("font", function(){
  return gulp
    .src(path.join(FONT_SRC, "**", "*"))
    .pipe(gulp.dest(FONT_DEST));
});

gulp.task("compass", function () {
  return gulp
    .src(SCSS_SRC)
    .pipe(gulpCompass({
      sass: SCSS_SRC_DIR,
      image: IMG_DEST,
      generated_images_path: IMG_DEST,
      http_path: IMG_DEST,
      font: FONT_DEST,
      css: CSS_DEST
    }))
    .pipe(gulp.dest(CSS_DEST))
});

gulp.task("watch", function () {
  gulp.watch(SCSS_SRC, ["compass"]);
  gulp.watch(IMG_SRC, ["image"]);
});

gulp.task("build", ["jade", "image", "font", "compass"]);
gulp.task("dev", ["build", "watch"]);