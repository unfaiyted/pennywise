// for resolving the absolute path to our project
// necessary for webpack
const path = require('path');
const webpack = require('webpack');

module.exports = {
    // where our app "starts"
    // add the promise and fetch polyfill first
    entry: {
        main: ['promise-polyfill', 'whatwg-fetch', './src/main/resources/static/js/global.js'],
        user: './src/main/resources/static/js/user.js'

    },
    // where to put the transpiled javascript
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static/built'),
        filename: '[name].js'
    },

    // babel config
    module: {
        loaders: [
            // {
            //     test: /\.js/,
            //     loader: 'babel-loader',
            //     include: __dirname + '/src',
            // },
            {
                test: /\.css/,
                loaders: ['style', 'css'],
                include: __dirname + 'src/main/resources/static/built'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loaders: ['url-loader?name=/img/[name].[ext]'],
                include: __dirname + 'src/main/resources/static/built'

            }
        ],
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },

            {
                test: /\.css$/,
                exclude: [/node_modules/, /img/],
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                // any file that ends with '.js'
                test: /\.js$/,
                // except those in "node_modules"
                exclude: /node_modules/,
                // transform with babel
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[path][name].[ext]',
                            publicPath: 'built/'
                        }
                    }
                ]
            }
        ]
    },

    // allows us to see how the transpiled js relates to the untranspiled js
    devtool: 'source-map',

    devServer: {
        contentBase: path.join(__dirname, 'src/main/resources/static/js'),
        port: 3143,
        compress: true,
        watchContentBase: true,
        // send requests that start with "/api" to our api server
        proxy: {
            '/api': {
                target: 'http://localhost:9191',
                pathRewrite: {'^/api': ''}
            }
        }
    }
};
