const path = require('path')
const nodeExternals = require('webpack-node-externals');

const config = {
    mode: 'development',
    target: 'node',
    externals: [ nodeExternals() ],
    entry: {
        'generated.server': './server/server.js',
        'generated.client': './client/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        publicPath: 'build/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/preset-env' ]
                }
            }
        },{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/preset-react' ]
                }
            }
        }]
    }
}

module.exports = config