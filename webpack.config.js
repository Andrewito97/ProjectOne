const path = require('path')
const nodeExternals = require('webpack-node-externals')

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
                    presets: [ '@babel/preset-env' ]
                }
            }
        }]
    }
}

const clientConfig = {
    mode: 'development',
    entry: {
        client: './client/App.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'generated.client.js',
        publicPath: 'build/'
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
        }]
    }
}

module.exports = [ clientConfig, serverConfig ]