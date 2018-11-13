var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var config = {
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.[hash:6].js"
  },
  devtool: "cheap-module-source-map",
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
        use: [
          { loader: "style-loader" },
          {
            loader: "typings-for-css-modules-loader",
            options: {
              modules: true,
              localIdentName: "[name]-[local]-[hash:base64:6]",
              camelCase: true,
              sourceMap: true,
              namedExport: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "typings-for-css-modules-loader",
            options: {
              modules: true,
              localIdentName: "[name]-[local]-[hash:base64:6]",
              camelCase: true,
              sourceMap: true,
              namedExport: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              browsers: ["last 2 versions", "ie >= 9", "Opera >= 20"],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
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
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    port: 8000,
    compress: true
  }
};

module.exports = config;
