var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var typescript = require('gulp-tsc');
var runSequence = require('run-sequence');
//const reporters = require('jasmine-reporters');
const Reporter = require('./custom-reporter');

gulp.task('compile', function(){
  return gulp.src(['ts/**/*.ts'])
    .pipe(typescript())
    .pipe(gulp.dest('js'));
});

function createTestPipe() {
   return gulp.src(['js/**/*.spec.js'])
              .pipe(jasmine({ reporter: new Reporter()}));
}

gulp.task('test', ['compile'], function() {
  return createTestPipe();
});

gulp.task('default', function(done) {
   runSequence('compile', 'test', done);
});

gulp.task('no-error-test', ['compile'], function() {
  var pipe = createTestPipe();
  pipe.on('error', function() {
    pipe.emit('end');
  });
  return pipe;
})

gulp.task('watch', ['no-error-test'], function () {
  const watcher = gulp.watch(watchables, ['no-error-test']);
  notify(watcher)
});

function notify(watcher) {
  const log = console.log;
  watcher.on('change', function (ev) {
    log('-> ' + ev.type + ': ' + ev.path)
  });
}

const watchables = [
  'ts/**/*.ts'
];
