const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')


module.exports = merge(baseConfig,{
    entry:{
        app:path.join(__dirname,'../src/entry-client.js')
    },
    plugins:[
        new VueSSRClientPlugin()
    ]
})