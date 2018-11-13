var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var config = {
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.[hash:6].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[hash:base64:6]",
              camelCase: true,
              minimize: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              browsers: ["last 2 versions", "ie >= 9", "Opera >= 20"]
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "App title",
      template: path.join("./src/index.ejs"),
      version: require("./package.json").version,
      inject: "body",
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      hash: true
    })
  ]
};

module.exports = config;
