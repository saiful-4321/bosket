const { resolve } = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlTargets = [ "angular", "react" ]

module.exports = {
    entry: {
        hotreload: "webpack/hot/only-dev-server",
        react: [
            "react-hot-loader/patch",
            "./docs/react/index.js"
        ],
        angular: "./docs/angular/index.ts",
        common: "./docs/common/index.js"
    },
    output: {
        filename: "[name]/build/[name].js",
        path: resolve(__dirname, ""),
        publicPath: "/"
    },
    resolve: {
        extensions: [ ".js", ".ts" ],
        alias: {
            bosket: resolve(__dirname, "../src"),
            self: resolve(__dirname, ".")
        }
    },

    devtool: "inline-source-map",

    devServer: {
        hot: true,
        host: "0.0.0.0",
        disableHostCheck: true,
        contentBase: resolve(__dirname, ""),
        publicPath: "/",
        port: 8080,
        compress: true
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            }, {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { importLoaders: 1 }},
                    "postcss-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFileName: resolve(__dirname, "angular/tsconfig.json"),
                    transpileOnly: true
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            filename: `${__dirname}/index.html`,
            template: `${__dirname}/index.ejs`,
            chunks: [ 'common' ],
            inject: 'head'
        }),
        ...htmlTargets.map(target => new HtmlWebpackPlugin({
            filename: `${__dirname}/${target}/index.html`,
            template: `${__dirname}/${target}/index.ejs`,
            chunks: [ 'common', target ],
            inject: 'head'
        }))
    ]
}
