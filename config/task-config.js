module.exports = {
  html        : true,
  images      : true,
  fonts       : true,
  static      : true,
  svgSprite   : true,
  ghPages     : true,
  stylesheets : {
    alternateTask: function(gulp, PATH_CONFIG, TASK_CONFIG) {
      // PostCSS task instead of Sass
      return function() {
        var pseudoContent = require('postcss-pseudo-content-insert'),
            autoprefixer = require('autoprefixer'),
            sass = require('gulp-sass'),
            postcss = require('gulp-postcss'),
            groupCssMediaQueries = require('gulp-group-css-media-queries'),
            browserSync  = require('browser-sync'),
            sourcemaps   = require('gulp-sourcemaps'),
            cssnano      = require('gulp-cssnano'),
            gulpif       = require('gulp-if'),
            path         = require('path'),
            stylelint = require('stylelint'),
            gulpStylelint = require('gulp-stylelint');

        var cssnanoConfig = TASK_CONFIG.stylesheets.cssnano || {}
            cssnanoConfig.autoprefixer = false // this should always be false, since we're autoprefixing separately

        var paths = {
          src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.stylesheets.src, '**/*.scss'),
          dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.stylesheets.dest)
        }

        if(TASK_CONFIG.stylesheets.sass && TASK_CONFIG.stylesheets.sass.includePaths) {
          TASK_CONFIG.stylesheets.sass.includePaths = TASK_CONFIG.stylesheets.sass.includePaths.map(function(includePath) {
            return path.resolve(process.env.PWD, includePath)
          })
        }

        const plugins = [
            autoprefixer({browsers: ['last 2 versions', 'ie >= 11', 'Edge 13', 'Safari 7']}),
            pseudoContent
        ]

        return gulp.src(paths.src)
            .pipe(gulpif(!global.production, gulpStylelint({
              failAfterError: false,
              reporters: [
                { formatter: 'string', console: true}
              ]
            })))
            .pipe(gulpif(!global.production, sourcemaps.init()))
            .pipe(sass.sync({
              outputStyle: 'expanded',
              precision: 10,
              includePaths: ['.']
            }).on('error', sass.logError))
            .pipe(postcss(plugins))
            .pipe(groupCssMediaQueries())
            .pipe(gulpif(global.production, cssnano(cssnanoConfig)))
            .pipe(gulpif(!global.production, sourcemaps.write()))
            .pipe(gulp.dest(paths.dest))
            .pipe(browserSync.stream());
      }
    }
  },

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ["./app.js"]
    }
  },

  browserSync: {
    server: {
      // should match `dest` in
      // path-config.json
      baseDir: 'public'
    }
  },

  production: {
    rev: true
  }
}

