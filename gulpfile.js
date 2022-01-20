const { src, dest, series, parallel, watch } = require('gulp');

// HTML task
const htmlmin = require('gulp-htmlmin')
function htmlTask(){
  return src("project/*.html")
  .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
  .pipe(dest("build/assets"));

}

exports.html = htmlTask;

//images task
const imgMin = require('gulp-imagemin')
function imgTask(){
  return src("project/pics/*")
  .pipe(imgMin())
  .pipe(dest("build/images"))
}

exports.img = imgTask;

//css task
const gulpConcat = require("gulp-concat")
const cssMin = require("gulp-clean-css")
function cssTask(){
  return src("project/css/**/*.css")
  .pipe(gulpConcat("style.min.css")).pipe(cssMin())
  .pipe(dest("build/assets"))
}

exports.css= cssTask;

//css js 
const jsMin = require("gulp-terser");
const browserSync = require('browser-sync');
function jsTask(){
  return src("project/js/*.js")
  .pipe(gulpConcat("script.min.js"))
  .pipe(jsMin())
  .pipe(dest("build/assets"))
}
exports.js= jsTask;

// watch
function watchTask(){
  watch("project/*.html", series(htmlTask,reloadTask));
  watch("project/css/**/*.css", series(cssTask,reloadTask));
  watch("project/js/*.js", series(jsTask,reloadTask));
}

// server
// const browserSync = require("browser-sync");
function serve(done){
  browserSync({
    server:{
      baseDir:"build/assets"
    }
  })
  done();
}

function reloadTask(cb){
  browserSync.reload()
  cb()
}

// function testTask(cb){
//   console.log("test")
//   cb()
// }

exports.default = series(parallel(htmlTask,jsTask,cssTask/*, imgTask */)/*,testTask*/,serve ,watchTask)









