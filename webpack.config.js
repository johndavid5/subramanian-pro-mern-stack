const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
	entry: {
		app: './src/App.jsx',
		vendor: ['react', 'react-dom', 'whatwg-fetch', 'babel-polyfill'],
	},
	output: {
		path: __dirname + '/static',
		filename: 'app.bundle.js'
	},
	plugins: [
		// DEPRECATED: new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js'}),
		new FaviconsWebpackPlugin('./public/images/favicon.ico')
	],
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			},
		]
	},
	// Configure devServer to serve static content
	// itself, but act as a proxy for REST /api
	// requests...
	devServer:{	
		port: 8000,
		contentBase: 'static',
		proxy: {
			'/api/*': {
				target: 'http://localhost:3000'
			}
		}
	}
};
