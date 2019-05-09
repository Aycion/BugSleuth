var path = require('path');
var nodeExternals = require('webpack-node-externals');


module.exports = (env) => {
	const node_env = process.env.NODE_ENV || 'production';

	const config = {
		name: 'server',
		mode: node_env,
		target: 'node',
		entry: './src/index.js',
		externals: [nodeExternals()],
		output: {
			filename: 'server.js',
			path: path.resolve(__dirname, 'dist')
		}
	};

	return config;
}