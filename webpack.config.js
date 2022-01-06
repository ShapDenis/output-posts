const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ESLintPlugin({}),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 3003,
    historyApiFallback: true,
  },
  devtool: "inline-source-map",
};
