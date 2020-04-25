const path = require('path');
const nodeExternals = require('webpack-node-externals');

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
                            "@babel/preset-env",
                            {
                                targets: {
                                    "esmodules": true
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
          },]
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
        },{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },]
    }
};

module.exports = [ clientConfig, serverConfig ];