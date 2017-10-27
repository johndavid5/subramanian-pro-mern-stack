const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

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
		//new HtmlWebpackPlugin({ favicon: 'public/images/favicon.ico'})
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
	},
	// Maps *.jsx to *.js...so that the original *.jsx
	// files will be available in your browser's dev
	// tools...supposedly...and you can set breakpoints
	// in the *.jsx files...
	devtool: 'source-map',
};
