/* eslint-disable no-undef */
const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

const serverConfig = {
	mode: 'development',
	target: 'node',
	externals: [ nodeExternals() ],
	entry: {
		server: './server/server.js',
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'generated.server.js',
		publicPath: 'build/'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [     
						[
							'@babel/preset-env',
							{
								targets: {
									'esmodules': true
								}
							}
						] 
					]
				}
			}
		},{
			test: /\.jsx?$/,   // need for server side rendering
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [ '@babel/preset-react' ]
				}
			}
		},{
			test: /\.css$/i,
			use: ['css-loader'],
		},{
			test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
			use: ['file-loader']
		}]
	}
};

const clientConfig = {
	mode: 'development',
	node: {
		fs: 'empty'
	},
	devtool: 'eval-source-map',
	entry: {
		client: './client/App.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'generated.[name].js',
		publicPath: 'build/'
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			maxSize: 2097152, //2mb
			enforceSizeThreshold: 2097152
		}
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [ '@babel/preset-react' ]
				}
			}
		},{
			test: /\.css$/i,
			use: ['style-loader', 'css-loader'],
		},{
			test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
			use: ['file-loader']
		}]
	},
	plugins: [new Dotenv(), new LoadablePlugin()]
};

module.exports = [ clientConfig, serverConfig ];