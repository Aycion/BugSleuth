const { series, parallel, watch } = require('gulp')
const del = require('del')
const { exec } = require('child_process')

/* Private Tasks */

const build_frontend = () => exec('gulp -f packages/frontend/gulpfile.js')
const build_styles = () => exec('gulp -f packages/frontend/gulpfile.js deploy:styles')
const build_backend = () => exec('gulp -f packages/backend/gulpfile.js')
const build_server_only = () => exec('gulp -f packages/backend/gulpfile.js deploy-server')
const start_server = () => exec('NODE_ENV=development SECRET=keyboard_cat DEBUG=bugsleuth:* nodemon dist/server.js')
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
/**
 * Installs packages needed for production server.
 */
const install = () => {
	// process.chdir('dist/')
	return exec('npm install dist/').on('error', console.error)
}

/**
 * Launches a dev server and monitors source code for changes.
 * */
const dev_server = async () => {
	// process.chdir(ROOT)
	console.log('dev server started')
	start_server().on('exit', () => console.log('exited'))
	/* When frontend source code changes, rebuild the frontend  */
	watch(['packages/frontend/src/**', '!packages/frontend/src/**/*.scss'], build_frontend)
	watch('packages/frontend/src/**/*.scss', build_styles)
	/* When backend source code changes, rebuild the backend,
	   leaving out package.json  */
	watch(['packages/backend/src/**'], build_server_only)
	/* Only update package.json on a dependency change.
	   Reduces unnecessary installations */
	watch(['packages/backend/*.json'], build_backend)
	watch('dist/*.json', install)
}

/* Public Tasks */

module.exports['build:front'] = build_frontend
module.exports['build:front'].description = 'Compiles the frontend and moves the compiled files to dist/assets'

module.exports['build:back'] = build_backend
module.exports['build:back'].description = 'Compiles the backend and moves the compiled files to dist/'

module.exports['build'] = parallel(build_backend, build_frontend)
module.exports['build'].description = 'Compile the whole project. Same as build:front and build:back together.'

module.exports['dev'] = series(parallel(series(build_backend, install), build_frontend), dev_server, launch_playground)
module.exports['dev'].description = 'Builds the whole project and rebuilds necessary parts when source code is changed.'

module.exports['playground'] = launch_playground

module.exports['clean'] = parallel(clean, clean_front, clean_back)

