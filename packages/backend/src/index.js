/**
 * Copyright (c) 2019 Business Performance Systems, LLC. 
 * Licensed under the MIT License
 * 
 * Written by Donald Isaac
 */

const config = require('./config'),
	createApp = require('./app'),
	http = require('http'),
	bluebird = require('bluebird')

/* Construct the express application */
const app = createApp(config)

/* Set the global promise system to Bluebird promises */
global.Promise = bluebird.Promise

/* Create a new HTTP Server, listen on a port */
http.createServer(app).listen(app.get('port'), () =>
	console.log(`Server listening at port ${app.get('port')}.`)
)
