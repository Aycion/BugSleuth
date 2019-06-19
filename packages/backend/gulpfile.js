const { src, dest, series } = require('gulp')
const del = require('del')
const { exec } = require('child_process')

function clean() {
	return del('dist/**')
}

function build_js() {
	return exec('webpack --env.NODE_ENV=production')
	/* return ts.src()
	.pipe(ts())
	.pipe(wp(require('./webpack.config')))
	.pipe(dest('tmp')) */
}

function deploy() {
	return src(['dist/**/*.*', 'package.json', 'package-lock.json'])
	.pipe(dest('../../dist'))
}

/**
 * Only deploy the compiled server. Don't deploy package.json, etc. as well.
 */
function deploy_server() {
	return src('dist/**/*.*')
	.pipe(dest('../../dist'))
}

module.exports['build'] = build_js
module.exports['clean'] = clean
module.exports['deploy-server'] = series(build_js, deploy_server)
module.exports.default = series(build_js, deploy)
