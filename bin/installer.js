/**
 * @summary BugSleuthInstallation script.
 * 
 * This script prompts the user for installation options and installs
 * BugSleuth accordingly. After installation, the user will get a JavaScript
 * bootstrap script that can then be put into a bookmark to launch BugSleuth.
 * 
 * @author Donald Isaac
 * @copyright 2019 Business Performance Systems, LLC. See LICENSE for details.
 */
const fs = require('fs')
const path = require('path')
const os = require('os');
const { exec, spawn } = require('child_process');
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})

/** Name of the directory all BugSleuth assets will be put into. */
const BUGSLEUTH_ROOT_DIR = 'BugSleuth';
/** URI to where to get the BugSleuth codebase. */
const BUGSLEUTH_INSTALL_URI = 'https://github.com/DonIsaac/BugSleuth';
/** Command that will get BugSleuth, given a URI */
const BUGSLEUTH_INSTALL_CMD = 'git clone';

/**
 * Installs BugSleuth into a `directory`.
 * @param {string} directory the path to the installation directory
 */
function install(directory) {
	return new Promise((resolve, reject) => {
		process.chdir(directory)
		let install_cmd = exec(`${BUGSLEUTH_INSTALL_CMD} ${BUGSLEUTH_INSTALL_URI}`)
		install_cmd.stdout.on("data", console.log)
		install_cmd.stderr.on("data", console.error)

		install_cmd.once("exit", (code, signal) => {
			if (code)  reject(code)
			process.chdir(BUGSLEUTH_ROOT_DIR)
			exec('npm install && npm run build')
			.once("exit", (code, signal) => {
				if (code) reject(code)
				resolve();
			})
			.stdout.on("data", console.log)
			
			
		})
		install_cmd.on("error", reject)

	})
}

console.log('Welcome to the BugSleuth installer.')

readline.question(
	'What directory should BugSleuth be installed in? (Defaults to your home directory): ',
	input => {
		input = input.trim()
		let dir; // Installation directory

		if (input && input.length)
			dir = path.resolve(process.cwd(), input)
		else
			dir = os.homedir()

		console.log(`Installing BugSleuth in directory ${dir}`)
		install(dir).then(() => {
			console.log('BugSleuth was successfully installed.')
			process.exit(0)
		})
		.catch(console.error)

	})
