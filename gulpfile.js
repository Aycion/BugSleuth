const { src, dest, series, parallel } = require('gulp')
const wp = require('webpack-stream')
const ts = require('gulp-typescript').createProject('./tsconfig.json')
const del = require('del')

const frontend = {
	entry: './Frontend/src/index.tsx',
	webpackConfig: './Frontend/webpack.config.js',
	dest: 'Backend/src/files/'
}

function clean(dirs) {
	return () => del(dirs)
}

function buildFrontend() {
	return src(frontend.entry)
	.pipe(ts())
	.pipe(wp(require(frontend.webpackConfig)))
	.pipe(dest(frontend.dest))
}

module.exports['build-frontend'] = series(clean(frontend.dest), buildFrontend)
