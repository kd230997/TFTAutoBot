const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    // Main process configuration
    mode: "development",
    target: "electron-main",
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.bundle.cjs",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
  },
  {
    // Renderer process configuration
    mode: "development",
    target: "electron-renderer",
    entry: "./src/renderer.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "renderer.bundle.cjs",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
  },
];
