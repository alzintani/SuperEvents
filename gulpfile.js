// including plugins
const gulp    = require('gulp');
const babel   = require("gulp-babel");
const notify  = require("gulp-notify");
const header  = require('gulp-header');
const include = require("gulp-include");
const minify  = require('gulp-minify');
const sass    = require('gulp-sass');
const rename  = require('gulp-rename');
const pug     = require('gulp-pug');
const parse   = require('comment-parser');

const callNotify = ( err, mesg ) => {
  let urgency = err ? 'critical' : 'low';
  let msg = err ? String(err).substring(0,200)+"..." : '';

  console.log(mesg);

  return gulp.src("./").pipe(notify({
    title: 'SuperEvents',
    message: 'All tasks are done!!' + msg || mesg,
    // icon: '',
    urgency: urgency,
    'expire-ime': 1
  }));
}

// using data from package.json
var pkg = require('./package.json');
var banner = ['/*!',
  ' * SuperEvents v<%= pkg.version %> (<%= pkg.homepage %>)',
  ' * Copyright 2018 SuperEvents',
  ' * MIT License (URL)',
  ' * ',
  ' * ',
  ' * @link <%= pkg.homepage %>',
  ' * @version v<%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' */',
  '',
  '',
].join('\n');

const apiGenerate = async () => {

  const path = './src/SuperEvents';

  let events = [];
  let event;

  const streamToString = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', chunk => chunks.push(chunk) );
      stream.on('error', reject );
      stream.on('end', () => resolve(chunks));
    });
  }

  const callback = ( err, data ) => {
    if (err) {
      console.log(err, data);
      return false;
    }
    return data;
  }

  for( let val of ['hover', 'click', 'mousemove', 'scroll'] ) {
    event = await streamToString(
      parse.file( `${path}/events/${val}.js`, callback)
    );
    events = [ event, ...events ];
  }

  const actions = await streamToString(
    parse.file( `${path}/actions/actions.js`, callback)
  );

  const easing = await streamToString(
    parse.file( `${path}/actions/easing.js`, callback)
  );

  return gulp.src( './src/pug/**.pug' )
    .pipe( pug({
      pretty: true,
      data: {        // Feed the templates
        events: events,
        actions: actions,
        easing: easing
      }
    }) )
    .on('error', (err) => console.log(err))
    .pipe(gulp.dest('./docs/'));
}

const runServer = () => {
  const express = require('express');
  const path = require('path');
  const port = 3001;

  const app = express();

  app.use( express.static(path.join(__dirname, 'docs')) );
  app.use( '/dist/', express.static(__dirname + '/dist/'));
  app.use( '/logo.png', express.static(__dirname + '/logo.png'));
  app.use( '/favicon.ico', express.static(__dirname + '/favicon.ico'));

  app.listen(port, function () {
    console.log(`> SuperEvents listening on port: ${port}`);
    console.log(`> Now. visit http://localhost:${port}`);
  });
}

gulp.task('compile-es6', function (cb) {

  return gulp.src('./src/SuperEvents/SuperEvents.js')
    .pipe(include()).on('error', callNotify) // include files
    .pipe( babel() ).on('error', callNotify) // compile JS code to es5
    .pipe(header(banner, {pkg: pkg})).on('error', callNotify) // add file header
    .pipe(minify({ ext:{ min:'.min.js' } }))
    .pipe(gulp.dest('./dist/'))
  && apiGenerate();

});

gulp.task('js', function (cb) {
  return gulp.src('./src/js/javascript.js')
    .pipe( babel() ).on('error', callNotify) // compile JS code to es5
    .pipe(minify({ ext:{ min:'.min.js' } }))
    .pipe(gulp.dest('./docs/assets/js/'));
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/style.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', callNotify))
    .pipe(rename({
      suffix: '.min'
    })).pipe(gulp.dest('./docs/assets/css/'));
});

gulp.task('pug', function () {
  return apiGenerate();
});

gulp.task('docs', async () => {
  return apiGenerate();
});

// default task
gulp.task('watch', function() {
  gulp.watch(
    ['./src/SuperEvents/**/*.js'], gulp.series('compile-es6', 'copy-to-docs', 'notify')
  );

  gulp.watch(
    ['./src/js/javascript.js'], gulp.series('js', 'notify')
  );

  gulp.watch(
    ['./src/scss/**/*.scss'], gulp.series('sass', 'notify')
  );

  gulp.watch(
    ['./src/pug/**/*.pug'], gulp.series('pug', 'notify')
  );

  runServer();
})

// default task
gulp.task('copy-to-docs', function() {
  return  gulp.src(['dist/**.js']).pipe(gulp.dest('docs/assets/js'));
});

// default task
gulp.task('notify', function() {
  return callNotify( null, 'SuperEvents is Compiled!!!!' );
});

gulp.task('build', gulp.series( 'pug', 'sass', 'js', 'compile-es6' ));
