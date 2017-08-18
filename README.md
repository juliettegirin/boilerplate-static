# boilerplate-static

Boilerplate for static projects with nunjucks templating, based on: https://github.com/vigetlabs/blendid with custom gulp tasks and sass architecture.

* gulp stylesheet task: sass linter ([gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint) with custom config), postcss plugins ([autoprefixer](https://www.npmjs.com/package/autoprefixer), [postcss-pseudo-content-insert](https://www.npmjs.com/package/postcss-pseudo-content-insert)), [gulp-group-css-media-queries](https://www.npmjs.com/package/gulp-group-css-media-queries), sourcemaps for dev and cssnano for prod.
* sass architecture: grid with susy grid (V2), normalize and sass mq for media queries 
