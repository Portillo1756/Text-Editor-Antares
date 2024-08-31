const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates HTML file with the bundled assets
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'PWA Webpack app',
      }),
      // Injects the service worker file into the build process
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      // Generates a manifest file for the PWA
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'PWA Webpack App',
        short_name: 'PWA',
        description: 'A simple progressive web application using webpack',
        background_color: '#ffffff',
        theme_color: '#fff',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], //multiple sizes
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // CSS loaders to handle css files
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // babel loader to transpile javascript files
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options:{
              presets: ['@babel/preset-env'],
              plugIn: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            },
          },
        },
      ],
    },
  };
};
