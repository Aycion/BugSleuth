const { src, dest, series, parallel } = require('gulp')
const del = require('del')
const { exec } = require('child_process')
const sass = require('gulp-sass')
 
sass.compiler = require('node-sass')

function clean() {
	return del('dist/**/*')
}

function build_js() {
	return pipe_output(exec('webpack --env.NODE_ENV=production --display-error-details true'), 1)
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
