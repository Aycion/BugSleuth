#!/usr/bin/env node

const commander 	= require('commander')
const pkg 			= require('../package.json')

const ROOT = __dirname;

commander
.version(pkg.version)
.command('build',)
.parse(process.argv)