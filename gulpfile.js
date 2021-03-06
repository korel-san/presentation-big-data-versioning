var gulp = require('gulp');
var open = require("gulp-open");
var livereload = require('gulp-livereload');

var connect = require('connect');
var serveStatic = require('serve-static');

var src = __dirname + '/presentation';
var port = process.env.PORT || 8000;

gulp.task('server', function(next) {
  connect()
    .use(serveStatic(src, {'index': ['index.html']}))
    .listen(port, next);
});

gulp.task('watch', ['server'], function() {
  var server = livereload();
  gulp.watch(src + '/**/*').on('change', function(file) {
    server.changed(file.path);
  });
});

gulp.task("url", function(){
  var options = {
    url: "http://localhost:" + port,
    app: "google-chrome"
  };

  gulp.src(src + "/index.html")
    .pipe(open("", options));
});

gulp.task('default',['watch', 'url']);