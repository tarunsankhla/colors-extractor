/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  module: {
    loaders: [{
      test:/\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
}

module.exports = nextConfig
