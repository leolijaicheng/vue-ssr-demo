const path = require('path')
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')


module.exports = merge(baseConfig,{
    entry:path.join(__dirname,'../src/entry-server.js'),
    target:'node',
    output:{
        filename:'server.bundle.js',
        libraryTarget:'commonjs2'
    },
    externals:[nodeExternals({
        allowlist:[/\.(s?css)$/]
    })],
    plugins:[
        new VueSSRServerPlugin()
    ]
})