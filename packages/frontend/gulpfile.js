const { src, dest, series, parallel } = require('gulp')
const wp = require('webpack-stream')
const ts = require('gulp-typescript').createProject('tsconfig.json')
const del = require('del')

const frontend = {
	entry: '/**/*.*',
	webpackConfig: './webpack.config.js',
	dest: 'dist'
}

function clean(dirs) {
	return () => del(dirs)
}

function buildFrontend() {
	return src(['src/**/*.tsx', 'src/**/*.ts'])
	.pipe(ts())
	// .pipe(wp(require('./webpack.config')))
	.pipe(dest('dist'))
}

module.exports['build-frontend'] = series(clean('dist/'), buildFrontend)
