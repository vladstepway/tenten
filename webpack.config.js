const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv = {}) => {
  //export default

  const { mode = 'development' } = argv;

  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'Webpack Config App',
        buildTime: new Date().toString(),
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [{ from: './src/assets/sounds', to: './sounds' }],
      }),
    ];
    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'main-[hash:8].css',
        }),
      );
    }
    return plugins;
  };

  return {
    mode: isProd ? 'production' : isDev && 'development',
    entry: {
      app: path.join(__dirname, 'src', 'index.js'),
    },
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        //typescript loader
        {
          test: /\.tsx|ts?$/,
          use: 'ts-loader',
          exclude: '/node_modules/',
        },
        //babel loader
        {
          test: /\.js$/,
          exclude: '/node_modules/',
          loader: 'babel-loader',
        },
        //svg loader
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
        //loading images
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name]-[sha1:hash:7].[ext]',
              },
            },
          ],
        },
        //loading fonts
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },
        //Loading SASS/SCSS
        {
          test: /\.(s[ca]ss)$/,
          use: [
            ...getStyleLoaders(),
            'sass-loader', //from bottom to top
          ],
        },
        //mp3 loader
        {
          test: /\.(mp3|mpe?g)$/,
          use: ['url-loader'],
        },
      ],
    },
    output: {
      filename: isProd ? 'main-[hash:8].js' : undefined,
      path: path.resolve(__dirname, './dist'),
    },
    devServer: {
      hot: true,
      // open: true, //open browser
    },
    plugins: getPlugins(),
  };
};
