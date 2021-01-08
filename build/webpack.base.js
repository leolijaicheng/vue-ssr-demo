const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const resolve = file => path.resolve(__dirname,file)
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    mode:isProd ? 'production' : 'development',
    output:{
        path:resolve('../dist'),
        publicPath:'/dist/',
        filename:'[name].[chunkhash:8].js'
    },
    resolve:{
        alias:{
            '@':resolve('../src/')
        },
        extensions:['.js','.vue','.json']
    },
    devtool:isProd ? 'source-map' : 'cheap-module-eval-source-map',
    module:{
        rules:[
            {
                test:/\.(png|jpg|gif)$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10240
                        }
                    }
                ]
            },
            {
                test:/\.m?js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        cacheDirectory:true,
                        plugins:['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                loader:'file-loader'
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    stats:'errors-only',
    plugins:[
        new VueLoaderPlugin(),
        // new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin()
    ]
}