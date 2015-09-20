var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		path.join(__dirname, './index')
	],
	output: {
		path: path.join(__dirname, './dist/'),
		filename: 'postcss-reverse-media.js',
		library: 'postcssReverseMedia',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	}/* */,
	node: {
		fs: 'empty'
	}
	/* */
};
