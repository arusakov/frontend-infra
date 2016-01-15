module.exports = {
  LOADER_BABEL: {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      presets: ['es2015', 'react']
    }
  },
  RESOLVE: {
    extensions: ['', '.jsx', '.js'],
    alias: {
    }
  },
  DEFINE_PLUGIN: {
    'DEF_HOST': '"localhost:8000"'
  }
};
