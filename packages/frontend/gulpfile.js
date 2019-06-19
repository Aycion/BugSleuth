const { src, dest, series, parallel } = require('gulp')
const del = require('del')
const { exec } = require('child_process')
const sass = require('gulp-sass')
 
sass.compiler = require('node-sass')

function clean() {
	return del('dist/**/*')
}

function build_js() {
	return exec('webpack --env.NODE_ENV=production')

}

function build_css() {
	return src('src/styles/**/*.scss')
	.pipe(sass({outFile: 'bugsleuth.css'}).on('error', sass.logError))
    .pipe(dest('./dist'))
}

function deploy() {
	return src('dist/**/*.*')
	.pipe(dest('../../dist/assets'))

}
module.exports['clean'] = clean
module.exports['build'] = series(parallel(build_js, build_css))
module.exports['deploy:styles'] = series(build_css, deploy)
module.exports.default = series(parallel(build_js, build_css), deploy)
