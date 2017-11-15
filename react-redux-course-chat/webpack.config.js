const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outputPath = path.resolve(__dirname, 'dist');
const publicPath = path.resolve(__dirname, '/src/assets/');

const webpackConfig = {
    entry: {
        app: [
            'webpack-hot-middleware/client',
            'react-hot-loader/patch',
            path.resolve(__dirname, './src/index.js')
        ]
    },
    output: {
        path: outputPath,
        filename: '[name].bundle.js',
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                enforce: 'pre',
                use: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: '/node_modules/',
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                exclude: '/node_modules/',
                include: path.resolve(__dirname, './src/assets/'),
                use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]'
            }
        ]
    },
    resolve: {
        alias: {
            'components': path.resolve(__dirname, './src/components'),
            'containers': path.resolve(__dirname, './src/containers'),
            'actions': path.resolve(__dirname, './src/actions'),
            'reducers': path.resolve(__dirname, './src/reducers'),
            'store': path.resolve(__dirname, './src/store'),
            'assets': path.resolve(__dirname, './src/assets'),
            'utils': path.resolve(__dirname, './src/utils'),
            'styles': path.resolve(__dirname, './src/assets/styles')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/assets/index.html'),
            filename: 'index.html',
            path: outputPath
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 8080,
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: '0.0.0.0'
    }
};

module.exports = webpackConfig;