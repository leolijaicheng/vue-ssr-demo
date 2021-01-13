const fs = require('fs')
const path = require('path')
const echarts = require('echarts')
const { createCanvas } = require('canvas')

exports.generateImage = function(options,imgPath){
    return new Promise((resolve,reject) => {
        const canvas = createCanvas(400,200)
        const ctx = canvas.getContext('2d')
        ctx.font = '12px 楷体'

        echarts.setCanvasCreator(function(){
           return canvas
        })

        const chart = echarts.init(canvas)
        options.animation = false
        
        chart.setOption(options)

        imgPath = imgPath || `${process.pid}-${Date.now()}.png`

        try {
            fs.writeFileSync(path.join(__dirname,'public',imgPath),chart.getDom().toBuffer())
            resolve({
                success:true,
                filename:imgPath
            })
        } catch (error) {
            reject({
                success:false,
                filename:null
            })
            console.log('Error:Write file failed:',imgPath)
        }
    })
}