'use strict'

const path = require('path')
let fs = require('fs');
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = {
    /* Path to source files directory */
    source: path.resolve(__dirname, './src/'),
    /* Path to built files directory */
    output: path.resolve(__dirname, './dist/'),
};
const favicon = path.resolve(paths.source, 'images', 'favicon.ico');
const myHeader = fs.readFileSync(paths.source + '/views/header.html');
const myBanner = fs.readFileSync(paths.source + '/views/banner.html');
const myAbout = fs.readFileSync(paths.source + '/views/about.html');
const myContact = fs.readFileSync(paths.source + '/views/contact.html');
const myFooter = fs.readFileSync(paths.source + '/views/footer.html');
module.exports = {
    stats: {
        errorDetails: true,
        children: true
    },
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'js/main.bundle.js',
        path: paths.output,
        clean: true, // strege folderul dist inainte sa genereze altul
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            favicon: favicon,
            myHeader: myHeader,
            myBanner: myBanner,
            myAbout: myAbout,
            myContact: myContact,
            myFooter: myFooter,
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new miniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(paths.source, 'images'),
                    to: path.resolve(paths.output, 'images'),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                },
                // {
                //     from: path.resolve(paths.source, 'videos'),
                //     to: path.resolve(paths.output, 'videos'),
                //     toType: 'dir',
                //     globOptions: {
                //         ignore: ['*.DS_Store', 'Thumbs.db'],
                //     },
                // },
            ],
        }),
    ],
    module: {
        rules: [
            {
                mimetype: 'image/svg+xml',
                scheme: 'data',
                type: 'asset/resource',
                generator: {
                    filename: 'icons/[hash].svg'
                }
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/i,
                type: 'asset/resource',
                generator: {
                    //filename: 'fonts/[name]-[hash][ext][query]'
                    filename: 'fonts/[name][ext][query]'
                }
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        // Extracts CSS for each JS file that includes CSS
                        loader: miniCssExtractPlugin.loader
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader'
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer
                                ]
                            }
                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: "compressed",
                            }
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                type: 'json'
            },
            {
                test: /\.(jpe?g|png|webp)$/,
                type: 'asset/resource',
                generator: {
                    filename: './images/[name].[hash:6][ext]',
                },
            },
            {
                test: /\.(js|ts)$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },

        ]
    },
    performance: { hints: false, maxAssetSize: 100000, }
}