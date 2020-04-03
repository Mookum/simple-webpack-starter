const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: ['node_modules/**'],
        aggregateTimeout: 300,
        poll: 1000
    },
    entry: ['./src/index.js', './scss/main.scss'],
    output: {
        filename: 'assets/js/main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            /*
            your other rules for JavaScript transpiling go in here
            */
            { // regular css files
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
            },
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ],
    },
    plugins: [
        /**
         * LoaderOptionsPlugin is used for aid migrationfor older loaders
         * @reference https://github.com/webpack/webpack.js.org/blob/develop/content/how-to/upgrade-from-webpack-1.md#loaderoptionplugin-context
         */
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                /**
                 * resolve-url-loader fix
                 * @reference https://github.com/bholloway/resolve-url-loader/issues/33#issuecomment-249830601
                 */
                context: path.join(__dirname, 'src'),
                output: {
                    path: path.join(__dirname, 'dist')
                },
                /**
                 * Legacy postCSS config
                 * @reference https://github.com/azat-io/webpack2-css-modules-demo/blob/master/scripts/webpack.config.babel.js
                 */
                postcss: [
                    require('autoprefixer')({
                        cascade: true,
                        remove: true
                    }),
                    require('css-mqpacker')()
                ]
            }
        }),
        new ExtractTextPlugin({
            filename: 'assets/css/[name].css',
            allChunks: true
        })
    ]
};