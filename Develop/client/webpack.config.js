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
      new HtmlWebpackPlugin({ // Uses the index.html file as the template for the plugin
        template:'./index.html',
      }),

      InjectManifest({ // Allows user to use a customized service worker along with create a manifest of all the file that are pre cached when the app starts running.
        swSrc: './src-sw.js',
        swDest:'./src-sw.js',
      }),
    

      new WebpackPwaManifest({ // This gives all the PWA info to WEBPACK so that it can create a manifest for user in the dev folder
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "Text editor with offline capabilities using IndexedDB",
        background_color: "#225ca3",
        theme_color: './',
        start_url: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        
      ],
    },
  };
};
