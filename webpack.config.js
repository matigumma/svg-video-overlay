const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 4400,
	},
	entry: './src/index',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},

	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(s[ac]ss|css)$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
		}),
		new CopyWebpackPlugin([
			{ from: 'public/assets', to: path.join(__dirname, 'dist', 'assets') },
		]),
	],
}
