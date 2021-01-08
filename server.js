const fs = require('fs')
const path = require('path')
const express = require('express')
const LRU = require('lru-cache')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.join(__dirname,file)


const isProd = process.env.NODE_ENV === 'production'

console.log('isProd::',process.env.NODE_ENV)


const server = express()

server.use('/dist',express.static('./dist'))


function createRenderer(bundle,options){
    return createBundleRenderer(bundle,Object.assign(options,{
        cache:new LRU({
            max:1000,
            maxAge:1000*60*15
        }),
        runInNewContext:false
    }))
}

let renderer
let readyPromise

const templatePath = resolve('./index.template.html')

if(isProd){
    const template = fs.readFileSync(templatePath,'utf-8')
    const serverBundle = require('./dist/vue-ssr-server-bundle.json')
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')

    renderer = createRenderer(serverBundle,{
        template,
        clientManifest
    })
}else{
    readyPromise = require('./build/setup-dev-server')(
        server,
        templatePath,
        (bundle,options) => {
            renderer  = createRenderer(bundle,options)
        }
    )
}


const render = (req,res) => {
    renderer.renderToString({
        title:'vue ssr demo',
        meta:'<meta name="description" content="vue ssr demo change my live">',
        url:req.url
    },(err,html) => {
        console.log(err)
        if(err){
            return res.status(500).end('Internal Serve Error')
        }

        res.setHeader('Content-Type','text/html;charset=utf8')

        res.end(html)
    })
}

server.get('*',isProd 
   ? render 
   : (req,res) => {
    readyPromise.then(() =>  render(req,res))
})

server.listen(3001,() => {
    console.log('Server running at http://localhost:3001')
})