module.exports = {
  entry: {
    app: ["./src/App.jsx"],
    vendor: [
      "react",
      "react-dom",
      "whatwg-fetch",
      "react-router-dom",
      "react-bootstrap",
      "react-router-bootstrap"
    ]
  },

  output: {
    path: __dirname + "/static",
    filename: "app.bundle.js"
  },
  devServer: {
    port: 8000,
    contentBase: __dirname + "/static",
    historyApiFallback: true,
    proxy: {
      "/api/*": {
        target: "http://localhost:3000"
      }
    }
  },
  plugins: [],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2,
          filename: "vendor.bundle.js"
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      }
    ]
  },

  devtool: "source-map"
};
