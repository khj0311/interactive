const { src, dest, series, parallel, watch } = require('gulp');
const fs = require('fs');
const browserSync = require('browser-sync');
const clean = require('gulp-clean');
const ejs = require('gulp-ejs');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const htmlbeautify = require('gulp-html-beautify');

// Data
let config = {};
let contents = {};

// Build Options
const htmlOptions = {
  indent_size: 2,
  preserve_newlines: false,
};

const scssOptions = {
  outputStyle: 'expanded',
  indentType: 'tab',
  indentWidth: 1,
  precision: 6,
  sourceComments: true,
};

function webServer() {
  return browserSync.init({
    port: 7777,
    host: 'localhost',
    server: {
      baseDir: './public',
      directory: true,
      index: 'index.html',
      routes: {
        '/assets': 'assets',
      },
    },
  });
}

function gulpWatch(cb) {
  watch('./src/**/**.ejs', buildHtml);
  watch('./src/pages/**/**.js', series(buildComponentJS, buildHtml));
  watch(['./src/common/js/vendor/**.js', './src/common/js/**.js', './src/layout/**/**.js'], series(buildCommonJS, buildHtml));
  watch('./src/pages/**/**.scss', series(buildComponentCSS, buildHtml));
  watch(['./src/common/scss/**.scss', './src/layout/**/**.scss'], series(buildCommonCSS, buildHtml));
  watch('./src/json/**.json', series(loadData, buildData, parallel(buildComponentJS, buildComponentCSS), buildHtml));

  cb();
}

async function buildHtml(cb, data = contents) {
  for (let i = 0; i < data.contents.length; i++) {
    const content = data.contents[i];
    const child = content.contents;

    if (typeof child !== 'undefined' && child.length > 0) {
      await buildHtml(cb, content);
    }

    if (content.type !== 'category') {
      src('./src/app.ejs', { allowEmpty: true })
        .pipe(
          ejs({
            config,
            root: contents,
            data: content,
          }).on('error', errorHandler)
        )
        .pipe(rename('index.html'))
        .pipe(htmlbeautify(htmlOptions))
        .pipe(dest(`./public${content.path}`))
        .pipe(browserSync.reload({ stream: true }));
    }
  }

  cb();
}

async function buildComponentJS(cb, data = contents) {
  for (let i = 0; i < data.contents.length; i++) {
    const content = data.contents[i];
    const child = content.contents;
    const path = content.path;

    if (typeof child !== 'undefined' && child.length > 0) {
      await buildComponentJS(cb, content);
    }

    if (content.type !== 'category') {
      src(`./src/pages${path}/main.js`, { allowEmpty: true })
        .pipe(concat('main.js'))
        .pipe(dest(`./public${path}`))
        .pipe(browserSync.reload({ stream: true }));
    }
  }

  cb();
}

async function buildCommonJS(cb) {
  src(['./src/common/js/vendor/**.js', './src/common/js/**.js', './src/layout/**/**.js'], { allowEmpty: true })
    .pipe(concat('common.js'))
    .pipe(dest(`./public/common/js`))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

async function buildComponentCSS(cb, data = contents) {
  for (let i = 0; i < data.contents.length; i++) {
    const content = data.contents[i];
    const child = content.contents;
    const path = content.path;

    if (typeof child !== 'undefined' && child.length > 0) {
      await buildComponentCSS(cb, content);
    }

    if (content.type !== 'category') {
      src(`./src/pages${path}/main.scss`, { allowEmpty: true })
        .pipe(scss(scssOptions).on('error', errorHandler))
        .pipe(concat('main.css'))
        .pipe(dest(`./public${path}`))
        .pipe(browserSync.reload({ stream: true }));
    }
  }

  cb();
}

async function buildCommonCSS(cb) {
  src(['./src/common/scss/**.scss', './src/layout/**/**.scss'], { allowEmpty: true })
    .pipe(scss(scssOptions).on('error', errorHandler))
    .pipe(concat('common.css'))
    .pipe(dest(`./public/common/css`))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

async function buildData(cb, data = contents, path = '') {
  for (let i = 0; i < data.contents.length; i++) {
    const content = data.contents[i];
    const child = content.contents;
    content.path = `${path}/${content.id}`;

    if (typeof child !== 'undefined' && child.length > 0) {
      await buildData(cb, content, content.path);
    }
  }

  cb();
}

function loadData(cb) {
  config = JSON.parse(fs.readFileSync('./src/json/config.json', 'utf-8'));
  contents = JSON.parse(fs.readFileSync('./src/json/contents.json', 'utf-8'));
  config.baseDir = __dirname;

  for (let i = 0; i < contents.contents.length; i++) {
    const content = contents.contents[i];
    let child = content.contents;
    if (content.type === 'category' && typeof child !== 'undefined' && child.length > 0) {
      child.sort(function (a, b) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return a.id > b.id;
      });
    }
  }

  cb();
}

function cleanProject() {
  return src('./public', { allowEmpty: true, read: false }).pipe(clean({ force: true }));
}

function errorHandler(error) {
  console.error(error);
}

exports.default = series(
  parallel(cleanProject, loadData),
  buildData,
  parallel(buildCommonJS, buildComponentJS, buildCommonCSS, buildComponentCSS),
  buildHtml,
  parallel(webServer, gulpWatch)
);
// exports.default = series(cleanProject, buildHtml);
// exports.default = series(cleanProject, buildHtml, webServer);
