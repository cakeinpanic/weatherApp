var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

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
		publicPath: '/dist/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
	postcss: function () {
		return [autoprefixer];
	},
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				loaders: ['react-hot', 'babel'],
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			},
			{
				test: /\.styl$/,
				loader: 'style!css!postcss!stylus?paths[]=node_modules&include css&resolve url'
			},
			{
				test: /\.json/,
				loader: 'json'
			}
		]
	}
};
