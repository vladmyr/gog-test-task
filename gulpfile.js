var config = require("config");
var path = require("path");
var gulp = require("gulp");
var gulpJade = require("gulp-jade");

gulp.task("jade", function(){
  return gulp
    .src(path.join(__dirname, config.dir.assetsJade, "**", "*.jade"))
    .pipe(gulpJade())
    .pipe(gulp.dest(path.join(__dirname, config.dir.build)));
});

gulp.task("images", function(){

});

gulp.task("compass", function(){

});

gulp.task("build", ["jade", "compass", "images"]);