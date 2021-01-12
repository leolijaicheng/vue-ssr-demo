const express = require('express')
const router = express.Router()
const { generateImage } = require('./canvas-echarts')
const  { userlist,movielist } = require('./modules')

router.get('/userList',(req,res) => {
    res.send(userlist)
})

router.get('/moveList',(req,res) => {
    res.send(movielist)
})

router.post('/drawEchart',(req,res) => {
   let body = ''
   let killed = false

   req.on('data',function(data){
       body += data

       if(body.length > 5000000){
           res.setHeader('Content-Type','text/plain')
           res.status(413).end('Request size exceeds reasonable limits!\n')
           killed = true
           return 
       }
   })

   req.on('end',async function(){
      if(killed){
          return 
      }
      body = body.trim()

      try {
          const jsObject = JSON.parse(body)
      } catch (error) {
          res.setHeader('Content-Type','text/plain')
          res.status(400)
          res.end('Post data is not valid JSON\n')
          killed = true
          return 
      }

      if(killed){
          return
      }

       const { success,filename } = await generateImage(body)

       if(success){
           res.status(200)
       }else{
           res.status(500)
       }

       res.setHeader('Content-Type','application/json')
       res.end(JSON.stringify({ success,filename }))

   })
})

module.exports = router