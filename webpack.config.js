const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");

const isProd = process.env.NODE_ENV === "production";

const getSettingsForStyles = (withModules = false) => {
    return [
        isProd ? MiniCssExtractPlugin.loader : "style-loader",
        !withModules ? "css-loader" : {
            loader: "css-loader",
            options: {
                modules: {
                    localIdentName: !isProd ? "[path][name]__[local]" : "[hash:base64]"
                }
            }
        }, {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["autoprefixer"]
                }
            }
        }, "sass-loader"];
}

module.exports = {
    entry: path.join(srcPath, "index.tsx"),
    target: !isProd ? "web" : "browserslist",
    devtool: isProd ? "hidden-source-map" : "eval-source-map",
    output: {
        path: buildPath,
        filename: "bundle.js",
        publicPath: '/'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(srcPath, "index.html")
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name]-[hash].css"
        }),
        new TsCheckerPlugin()
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true)
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles()
            },
            {
                test: /\.[jt]sx?$/,
                use: "babel-loader"
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /\.(woff|woff2)$/,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
        alias: {
            "@assets": path.join(srcPath, "assets"),
            "@components": path.join(srcPath, "components"),
            "@configs": path.join(srcPath, "configs"),
            "@context": path.join(srcPath, "context"),
            "@pages": path.join(srcPath, "app/pages"),
            "@store": path.join(srcPath, "store"),
            "@styles": path.join(srcPath, "styles"),
            "@utils": path.join(srcPath, "utils"),
        }
    },
    devServer: {
        host: "localhost",
        port: 3000,
        hot: true,
        historyApiFallback: true
    }
}