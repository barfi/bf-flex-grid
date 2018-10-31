/**
 * Webpack development configuration
 *
 * @description Development config
 * @author Mr.Barfi <barfiwebdev@gmail.com>
 * Saint-Petersburg, 2018
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

let config = {

    /**
     * Webpack entry/output points
     * Docs: <https://webpack.js.org/configuration/entry-context/#context>
     * Docs: <https://webpack.js.org/configuration/entry-context/#entry>
     * Docs: <https://webpack.js.org/configuration/output/>
     */

    context: path.resolve(__dirname, 'src'), // source root

    entry: {
        app: ['./js/entry.js', './scss/entry.scss']
    },

    output: {
        filename: 'js/[name].[hash:12].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },

    /**
     * Plugins
     * Docs: <https://webpack.js.org/concepts/plugins/>
     */

    plugins: [

        /**
         * HtmlWebpackPlugin
         * Generates html files from templates or scratch
         * Docs: <https://github.com/jantimon/html-webpack-plugin>
         */

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),

        /**
         * CopyWebpackPlugin
         * Copies or proxies static files
         * Docs: <https://webpack.js.org/plugins/copy-webpack-plugin/>
         */

        new CopyWebpackPlugin(
            [
                {from: 'static', to: ''},
            ],
            {
                // options
            }
        ),

        /**
         * ProvidePlugin
         * Automatically load modules.
         * Docs: <https://webpack.js.org/plugins/provide-plugin/>
         */

        new webpack.ProvidePlugin({
            // $: 'jquery',
            // jQuery: 'jquery'
        }),

    ],

    /**
     * Module (Loaders)
     * Docs: <https://webpack.js.org/configuration/module/>
     */

    module: {
        rules: [

            /**
             * Styles loaders css, sass or scss
             * @description Dev mode - styles are inject inline in <head>
             * Docs: <https://webpack.js.org/guides/asset-management/>
             */
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: "style-loader",
                        // Docs: <https://github.com/webpack-contrib/style-loader>
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'css-loader',
                        // Docs: <https://github.com/webpack-contrib/css-loader>
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'postcss-loader',
                        // Docs: <https://github.com/postcss/postcss-loader>
                        // Docs: <https://github.com/browserslist/browserslist#queries>
                        options: {
                            sourceMap: false,
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        // Docs: <https://github.com/webpack-contrib/sass-loader>
                        options: {sourceMap: true}
                    }
                ]
            },

            /**
             * JavaScript transpiling loaders
             * @description Babel loader with preset ENV is applied
             * Docs: <https://github.com/babel/babel-loader>
             */

            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            /**
             * Images loader
             * @description This loader base is file-loader
             * Docs: <https://github.com/webpack-contrib/file-loader>
             */

            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            },

            /**
             * Fonts loader
             * @description This loader base is file-loader
             * Docs: <https://github.com/webpack-contrib/file-loader>
             */

            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            },
        ]
    },

    /**
     * Devtool
     * Docs: <https://webpack.js.org/configuration/devtool/>
     */

    devtool: 'eval-source-map', // JavaScript source map

    /**
     * Performance
     * Docs:<https://webpack.js.org/configuration/performance/>
     */

    performance: {
        hints: false // disable warnings in terminal (console)
    },

    /**
     * Webpack Dev Server
     * Docs: <https://webpack.js.org/configuration/dev-server/>
     */

    devServer: {
        overlay: true, // Show overlay with errors if them exists
        contentBase: path.join(__dirname, 'dist'), // 'dist' folder as root of server
    },

};

/**
 * Export config
 * @type {Object}
 */

module.exports = config;
