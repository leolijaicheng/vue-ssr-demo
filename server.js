const fs = require('fs')
const path = require('path')
const express = require('express')
const LRU = require('lru-cache')
const compression = require('compression')
const microCache = require('route-cache')
const router = require('./server-router')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.join(__dirname,file)


const isProd = process.env.NODE_ENV === 'production'

console.log('isProd::',process.env.NODE_ENV)

const serveStatic = (path,cache = true) => {
    return express.static(
        resolve(path),
        {
            maxAge:cache && isProd ? 1000 * 60 * 24 * 30 : 0
        }
    )
}


const server = express()

server.use(compression())

server.use('/api',router)

server.use('/dist',serveStatic('./dist'))

server.use('/public',serveStatic('./public'))

// 页面级缓存
server.use(microCache.cacheSeconds(1,req => req.originalUrl))


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

    if(req.path === '/favicon.ico'){
        return res.end()
    }

    renderer.renderToString({
        title:'vue ssr demo',
        meta:'<meta name="description" content="vue ssr demo change my live">',
        url:req.url
    },(err,html) => {
        if(err){
            return res.status(500).end('Internal Serve Error')
        }

        res.setHeader('Content-Type','text/html;charset=utf8')

        res.end(html)
    })
}

server.get(/\/(view\/)?/,isProd 
   ? render 
   : (req,res) => {
    readyPromise.then(() =>  render(req,res))
})

server.listen(3001,() => {
    console.log('=> Server running at http://localhost:3001')
})