var path = require('path');

module.exports = {
    entry: "./web/static/js/app.js",
    output: {
        path: "./priv/static/js",
        filename: "bundle.js"
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: path.join(__dirname, 'web/static/js')
        },
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass?outputStyle=expanded'],
          include: path.join(__dirname, 'web/static/css')
        }
      ]
    }
};
