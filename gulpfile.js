var config = require("config");
var path = require("path");
var gulp = require("gulp");
var gulpJade = require("gulp-jade");
var gulpCompass = require("gulp-compass");
var gulpImagemin = require("gulp-imagemin");

var JADE_SRC = path.join(__dirname, config.dir.assetsJade, "**", "*.jade");
var JADE_DEST = gulp.dest(path.join(__dirname, config.dir.build));
var IMG_SRC = path.join(__dirname, config.dir.assetsImg, "**", "*");
var IMG_DEST = gulp.dest(path.join(__dirname, config.dir.buildImg));
var SCSS_SRC_DIR = path.join(__dirname, config.dir.assetsSass);
var SCSS_SRC = path.join(SCSS_SRC_DIR, "**", "*.scss");
var CSS_DEST = path.join(__dirname, config.dir.buildCss);

gulp.task("jade", function(){
  return gulp
    .src(JADE_SRC)
    .pipe(gulpJade())
    .pipe(JADE_DEST);
});

gulp.task("image", function(){
  return gulp
    .src(IMG_SRC)
    .pipe(gulpImagemin({
      progressive: true,
      optimizationLevel: config.gulp.image.optimizationLevel
    }))
    .pipe(IMG_DEST)
});

gulp.task("compass", function(){
  return gulp
    .src(SCSS_SRC)
    .pipe(gulpCompass({
      sass: SCSS_SRC_DIR,
      image: path.join(__dirname, config.gulp.compass.img),
      css: CSS_DEST
    }))
});

gulp.task("watch", function(){
  gulp.watch(SCSS_SRC, ["compass"]);
  gulp.watch(IMG_SRC, ["image"]);
});

gulp.task("build", ["jade", "compass", "image"]);
gulp.task("dev", ["build", "watch"]);