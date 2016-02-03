var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:3030',
		'webpack/hot/only-dev-server',
		'./src/index.jsx'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				loaders: ['react-hot', 'babel'],
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.styl$/,
				loader: 'style!css!stylus?paths[]=lib&include css'
			},
			{
				test: /\.json/,
				loader: 'json'
			}
		]
	}
};
