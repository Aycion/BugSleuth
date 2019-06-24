const { src, dest, series, parallel, watch } = require('gulp')
const del = require('del')
const { exec, fork } = require('child_process')
const zip = require('gulp-zip')
const package = require('./package.json')

/* Private Tasks */

const build_frontend = () => pipe_output(exec('gulp -f packages/frontend/gulpfile.js'), 2)
const build_styles = () => exec('gulp -f packages/frontend/gulpfile.js deploy:styles')
const build_backend = () => exec('gulp -f packages/backend/gulpfile.js')
const build_server_only = () => exec('gulp -f packages/backend/gulpfile.js deploy-server')
const start_server = () => pipe_output(exec('NODE_ENV=development SECRET=keyboard_cat DEBUG=bugsleuth:* nodemon dist/server.js'), 0)

const build_docs = () => {
  pipe_output(exec('sass ./docs/assets/scss/styles.scss ./docs/assets/css/styles.css'), 2)
  pipe_output(fork('./docs/src/render.js'), 2)
  
  return src(['dist/**/*.*', '!dist/**/*.json', '!dist/**/*.map.*'])
  .pipe(zip(`bugsleuth-${package.version}.zip`))
  .pipe(dest('docs/assets/downloads'))

}
//const launch_playground = () => setTimeout(() => exec('open packages/playground/index.html'), 250)
const launch_playground = () => new Promise((resolve, reject) => {
	setTimeout(() => {
		exec('open packages/playground/index.html')
		resolve()
	}, 250)
})

const clean = () => del(['dist/**/*'])
const clean_front = () => exec('gulp -f packages/frontend/gulpfile.js clean')
const clean_back = () => exec('gulp -f packages/frontend/gulpfile.js clean')
const clean_docs = () => del(['docs/assets/downloads/*.zip', 'docs/assets/css/*'])
/**
 * Installs packages needed for production server.
 */
const install = () => exec('npm install dist/')

/**
 * Launches a dev server and monitors source code for changes.
 */
const dev_server = async () => {
	// process.chdir(ROOT)
	console.log('dev server started')
	start_server().on('exit', () => console.log('Server exited.'))
	/* When frontend source code changes, rebuild the frontend  */
	watch(['packages/frontend/src/**', '!packages/frontend/src/**/*.scss'], build_frontend)
	watch('packages/frontend/src/**/*.scss', build_styles)
	/* When backend source code changes, rebuild the backend,
	   leaving out package.json  */
	watch(['packages/backend/src/**'], build_server_only)
	/* Only update package.json on a dependency change.
	   Reduces unnecessary installations */
  watch(['packages/backend/*.json'], build_backend)
  // watch(['docs/src/render.js', 'docs/src/data/**', 'docs/src/**/*.hbs', 'docs/assets/**', '!docs/assets/css/**'], build_docs)
	watch('dist/*.json', install)
}

/* Public Tasks */

module.exports['build:front'] = build_frontend
module.exports['build:front'].description = 'Compiles the frontend and moves the compiled files to "dist/assets".'

module.exports['build:back'] = build_backend
module.exports['build:back'].description = 'Compiles the backend and moves the compiled files to "dist/".'

module.exports['build:docs'] = build_docs
module.exports['build:docs'].description = 'Renders the documentation into a production-ready static site.'
module.exports['build'] = parallel(build_backend, build_frontend)
module.exports['build'].description = 'Compile the whole project. Same as build:front and build:back together.'

module.exports['dev'] = series(parallel(series(build_backend, install), build_frontend, build_docs), dev_server, launch_playground)
module.exports['dev'].description = 'Builds the whole project and rebuilds necessary parts when source code is changed.'

module.exports['playground'] = launch_playground

module.exports['clean:front'] = clean_front
module.exports['clean:docs'] = clean_docs
module.exports['clean:back'] = clean_back
module.exports['clean'] = parallel(clean, clean_front, clean_back)
module.exports['clean'].description = 'Deletes compiled and intermediate files/directories.'

/* Helper Functions */

/**
 * Child process decorator.
 * 
 * Pipes the output streams of a process to the executing task's
 * output streams.
 * 
 * @param {ReadableStream} child_process the child process to pipe
 * @param {Number} mode 0 to pipe stderr only, 1 to pipe stdout only, 2 for both
 * 
 * @return {ReadableStream} the modified `child_process` parameter
 */
function pipe_output(child_process, mode = 0) {
	if (mode == 0 && child_process.stderr)
		child_process.stderr.pipe(process.stderr)
	else if (mode == 1 && child_process.stdout)
		child_process.stdout.pipe(process.stdout)
	else {
    if (child_process.stderr)
      child_process.stderr.pipe(process.stderr)
    if (child_process.stdout)
		  child_process.stdout.pipe(process.stdout)
	}

	return child_process
}
