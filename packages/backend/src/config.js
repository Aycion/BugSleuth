const path = require('path')
let config = {};
const prod = process.env.NODE_ENV === 'production'

/* Server config settings */
config.server = {}						

/* Secret key must be provided in a production environment */
if (!process.env.SECRET) {	
	if (prod)
		throw Error('No secret specified, please specify a secret key under the SECRET environment variable. Aborting.')
	else
		console.warn('Warning: No secret key specified. Setting a default secret key.')
}

/* Set the server's secret key */
config.server.secret = process.env.SECRET || 
	'Your mother was a hamster and your father smelled of elderberries'
/* Set the port number */
config.server.port = process.env.PORT || 3000
/* Static asset directory location*/
config.server.assetDir = process.env.ASSET_DIR || path.resolve('./assets')
/* Freeze the config object so that settings can't be modified post-launch */
Object.freeze(config)

/* Export the created config object */
module.exports = config
