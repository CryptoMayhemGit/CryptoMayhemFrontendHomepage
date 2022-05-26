const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StaticI18nHtmlPlugin = require('webpack-static-i18n-plugin');


//abstract over the multiple htmlWebpackPlugin declarations for each page
const generateHtmlPlugin = (title) => {
    return new HtmlWebpackPlugin({
      title,
      filename: `${title}.html`,
      template: `./views/${title}.html`,
    });
  }
  
const populateHtmlPlugins = (pagesArray) => {
    res = [];
    pagesArray.forEach(page => {
        res.push(generateHtmlPlugin(page));
    })
    return res;
}

const pages = populateHtmlPlugins(
    [
        'index',
        'legal-compliance',
        'privacy-policy',
        'terms-and-conditions',
    ]
);
//****************************************************

module.exports = {
    entry: {
        main: [
            './js/index.js',
            './scss/index.scss'
        ],
    },
    output: {
        filename: '[name].js',
    },
    devServer: {
        static: {
        directory: path.join(__dirname, '/dist/'),
        },
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                {
                    loader: 'html-loader',
                }
                ],
            },
            {
                test: /\.scss$/,
                use: [
                'style-loader',
                'css-loader',
                'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash][ext]'
                }
            }
        ]
    },
    plugins: [
        ...pages,
        new StaticI18nHtmlPlugin({
            locale : 'en', // The default locale
            locales: ['pl', 'en'],
            outputDefault: '__lng__/__file__', // default: '__file__'
            outputOther: '__lng__/__file__', // default: '__lng__/__file__'
            localesPath: path.join(__dirname, 'locales/'),
            suppressRaw: true,
            files: '*.html',
          })
    ]
}

