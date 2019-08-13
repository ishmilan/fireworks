const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const CopyPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: ['./src/js/fireworks.js', './src/sass/main.scss'],
    output: {
        path: __dirname + '/dist',
        filename: 'fireworks.js',
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: devMode ?
                            () => [] : () => [
                                postcssPresetEnv({
                                    browsers: ['>1%']
                                }),
                                require('cssnano')()
                            ]
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }]
    },
    plugins: [
        new HtmlWebPlugin({
            template: './src/views/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'style/fireworks.css' : 'style/fireworks.min.css'
        }),
        new CopyPlugin([{
            from: './src/assets',
            to: 'assets'
        }])
    ]
};
