const { src, dest, series, parallel, watch } = require('gulp')
const del = require('del')
const { exec } = require('child_process')
const sass = require('gulp-sass')
const zip = require('gulp-zip')
const package = require('./package.json')

sass.compiler = require('node-sass')

function clean() {
	return del('build/**/*')
}

function build_js() {
	return pipe_output(exec('webpack --env.NODE_ENV=production --display-error-details true'), 1)
}

function build_docs() {
	return exec('bin/render.js')
}

function build_css() {
	return src('src/styles/**/*.scss')
	.pipe(sass({outFile: 'bugsleuth.css'}).on('error', sass.logError))
    .pipe(dest('./build'))
}

function deploy() {
	return src(['build/**/*.*', '!build/**/*.json', '!build/**/*.map.*'])
	.pipe(zip(`bugsleuth-${package.version}.zip`))
	.pipe(dest('dist'))
}

function dev(cb) {
	watch('src/styles/**/*.scss', build_css)
	watch(['src/**/*.*', '!src/styles/**/*.scss'], build_js)
	cb()
}

function launch_playground () {
	return exec('open test/playground.html')
}

module.exports['clean'] = clean
module.exports['clean'].description = 'Removes all built files'

module.exports['build'] = parallel(build_js, build_css, build_docs)
module.exports['build'].description = 'Compiles the widget code, stylesheets, and documentation'
module.exports['build:docs'] = build_docs
module.exports['build:docs'].description = 'Compiles the widget documentation only'

module.exports['dev'] = series(exports['build'], dev, launch_playground)
module.exports['dev'].description = 'Builds the widget and launches a development environment'

module.exports['deploy'] = deploy
module.exports['deploy'].description = 'Deploys the compiled code into a zip file for deployment'
module.exports['deploy:styles'] = series(build_css, deploy)
module.exports['deploy:styles'].description = 'Deploys the stylesheets only'

module.exports['playground'] = launch_playground
module.exports['playground'].description = 'Opens the development testing webpage'

module.exports.default = series(exports['build'], deploy)
module.exports.default.description = 'Compiles and deploys the widget and documentation'

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
