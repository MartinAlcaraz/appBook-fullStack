const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV == "development";  // si ejecuto npm run build ,   NODE_ENV = production , en el archivo package.json

module.exports = {

    entry: './front-end/app.js',       // indica donde esta el archivo principal del frontEnd
    // que se va a convertir en archivos simples html, css y js.
    output: {
        path: path.join(__dirname, 'back-end/public'),  // destino de los archivos convertidos
        filename: 'js/bundle.js'
    },
    mode: "production",
    module: {
        rules:[
            {
                test:/\.js$/,               //  
                loader:'babel-loader'               
            },       
            {
                test: /\.css/,                          // carga los estilos en el codigo javascript
                use:[ 
                    devMode ? 'style-loader': MiniCssExtractPlugin.loader, // si estoy en desarrollo carga los estilos en el archivo .js, si estoy en produccion carga los estilos en un archivo .css
                    'css-loader' ]
            }
        ]
    },
   
    plugins: [
        new HtmlWebpackPlugin({
            template: './front-end/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'          // es el archivo que se crea cuando se ejecuta este plugin
        })
    ],
    devtool: 'source-map'
}