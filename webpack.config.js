
module.exports = {
  entry: {
    app: ['./web/components/list/view.jsx']
  },
  output: {
    path: `${__dirname}/web/dist`,
    filename: '[name].boundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.css/,
        loaders: ['style', 'css'],
      },
    ]
  }
};