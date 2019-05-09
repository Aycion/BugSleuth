const express = require('express'),
	compression = require('compression'),
	helmet = require('helmet'),
	routes = require('./routes')

/**
 * Express app factory function.
 * 
 * @param {Object} config the config object.
 * 
 * @returns {Express.Application} the created express application
 */
module.exports = exports = function createApp(config) {
	const app = express()

	/* Set the port number the server will listen on */
	app.set('port', config.server.port)

	/* Mount middleware */
	app.use(helmet())
	app.use(compression())

	/* Mount the router */
	app.use(routes(config))

	return app
}
