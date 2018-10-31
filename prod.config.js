/**
 * Webpack production configuration
 *
 * @description Production config
 * @author Mr.Barfi <barfiwebdev@gmail.com>
 * Saint-Petersburg, 2018
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
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
        app: ['./js/main.js', './scss/style.scss']
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
         * CleanWebpackPlugin
         * Clean 'dist' folder before each build
         * Docs: <https://github.com/johnagan/clean-webpack-plugin>
         */

        new CleanWebpackPlugin(['dist']),

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
            // jQuery: 'jquery',
            // 'window.$': 'jquery',
            // 'window.jQuery' : 'jquery'
        }),

        /**
         * MiniCssExtractPlugin
         * Extracts styles into file .css
         * Docs: <https://github.com/webpack-contrib/mini-css-extract-plugin>
         */

        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:12].css"
        })

    ],

    /**
     * Module (Loaders)
     * Docs: <https://webpack.js.org/configuration/module/>
     */

    module: {
        rules: [

            /**
             * Styles loaders css, sass or scss
             * @description Prod mode - styles are extract in file
             * Docs: <https://webpack.js.org/guides/asset-management/>
             */

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // Docs: <https://github.com/webpack-contrib/mini-css-extract-plugin>
                        options: {publicPath: '../'}
                    },
                    {
                        loader: 'css-loader',
                        // Docs: <https://github.com/webpack-contrib/css-loader>
                        options: {sourceMap: false}
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
                        options: {sourceMap: false}
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
     * Optimization
     * Docs: <https://webpack.js.org/configuration/optimization/>
     */

    optimization: {
        minimizer: [

            /**
             * UglifyJsPlugin
             * Docs: <https://github.com/webpack-contrib/uglifyjs-webpack-plugin>
             * Docs: <https://github.com/mishoo/UglifyJS2#compress-options>
             */

            new UglifyJsPlugin({
                parallel: true,
                uglifyOptions: {
                    output: {
                        comments: false, // remove comments
                        beautify: false // compress and delete gaps
                    },
                }
            }),

            /**
             * OptimizeCSSAssetsPlugin
             * Docs: <https://github.com/NMFR/optimize-css-assets-webpack-plugin>
             */

            new OptimizeCSSAssetsPlugin({})
        ]
    }
};

module.exports = config;


