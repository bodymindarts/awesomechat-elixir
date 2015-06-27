module.exports = {
    entry: "./web/static/js/app.js",
    output: {
        path: "./priv/static/js",
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel'],
        }
        // {
        //   test: /\.scss$/,
        //   loaders: ['style', 'css', 'sass?outputStyle=expanded']
        // }
      ]
    }
};
