const { src, dest, series } = require('gulp')
const del = require('del')
const { exec } = require('child_process')

function clean() {
	return del('dist/**')
}

function build_js() {
	return pipe_output(exec('webpack --env.NODE_ENV=production'), 1)
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

/**
 * Pipes the output streams of a process to the executing task's
 * output streams.
 * 
 * @param {ChildProcess} child_process the child process to pipe
 * @param {Number} mode 0 to pipe stderr only, 1 to pipe stdout only, 2 for both
 */
function pipe_output(child_process, mode = 0) {
	if (mode == 0)
		child_process.stderr.pipe(process.stderr)
	else if (mode == 1)
		child_process.stdout.pipe(process.stdout)
	else {
		child_process.stderr.pipe(process.stderr)
		child_process.stdout.pipe(process.stdout)
	}

	return child_process
}
