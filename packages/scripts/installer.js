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
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})

console.log('Welcome to the BugSleuth installer.')

readline.
readline.question(
	'What directory should BugSleuth be installed in? (Defaults to your home directory)',
	input => {
		input = input.trim();
		let dir = input || input.length > 0 ? input : '~'
		let installPath = path.resolve(process.cwd(), dir)
		if (fs.existsSync(installPath)) {

		}

})
