const Router = require('express').Router
/** @type {import 'fs'} */
/* global promises = bluebird promises */
const fs = require('bluebird').promisifyAll(require('fs'))	
const path = require('path')

const bootstrap = 'bootstrap.js'	/* Name of the bootstrap script file */
const widget = 'bugsleuth.js'		/* Name of the main widget script file */
const stylesheet = 'bugsleuth.css'	/* Name of the stylesheet file */

/**
 * Router factory function.
 * @param {Object} config the configuration object.
 * 
 * @returns {Router} the built router to be mounted to the application
 * 
 * @see config.js
 */
module.exports = exports = function createRoutes(config) {
	const routes = Router()
	const { assetDir } = config.server

	routes.get('/widget/stylesheet', (req, res, next) => {
		return res.sendFile(path.join(assetDir, stylesheet), next)
	})
	
	routes.get('/scripts/bootstrap', async (req, res, next) => {
		// TODO: Auth logic, build script from template
		res.sendFile(path.join(assetDir, bootstrap), next)
	})

	routes.get('/widget/script', (req, res, next) => {
		return res.sendFile(path.join(assetDir, widget), next)
	})

	return routes
}
