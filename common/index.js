const superagent = require('superagent')
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')
const request = require('request')
const qiniu = require('qiniu')
const { accessKey, secretKey, bucket } = require('../config')

let mac  = new qiniu.auth.digest.Mac(accessKey, secretKey)
let options = {
    scope: bucket
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)
const qnConfig = new qiniu.conf.Config()
qnConfig.zone = qiniu.zone.Zone_z0

// 爬取图片地址
const get500pxPhotos = (currentPage, pageSize = 50) => {
    console.log(currentPage, pageSize);
    
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api.500px.com/v1/photos?rpp=${pageSize}&feature=popular&image_size%5B%5D=${32}&image_size%5B%5D=${36}&image_size%5B%5D=${2048}&sort=&include_states=true&include_licensing=true&formats=jpeg%2Clytro&only=&exclude=&personalized_categories=&page=${currentPage}&rpp=${pageSize}`
        }, (err, res, body) => {
            if (err) {
                reject(err)
            }
            
            let { photos } = JSON.parse(body)
            let imgList = []
            Object.keys(photos).map(key => {
                imgList.push(photos[key])
            })
            resolve(imgList)
        })
    })
}

// 上传到七牛云
const qiniuUpload = (photos = []) => {
    return new Promise((resolve, reject) => {
        const formUpload = new qiniu.form_up.FormUploader(qnConfig)
        const putExtra = new qiniu.form_up.PutExtra()
        const uploadResult = []
        photos.map(photoUrl => {
            let fileName = photoUrl.match(/sig=\w+/)[0]
            var readStream = request.get({ url: photoUrl, headers: { 'Referer': 'https://500px.com/popular' }})
            formUpload.putStream(uploadToken, fileName, readStream, putExtra, (err, body, info) => {
                if (err) { return reject(err)}
                if (info.statusCode === 200) {
                    uploadResult.push(body)
                }
                reject(info)
            })
        })
        resolve(uploadResult)
    })
}

// const downImg = () => {
//     return new Promise((resolve, reject) => {
//         const imgUrl = 'https://drscdn.500px.org/photo/1012534941/q%3D80_h%3D300/v2?sig=d8c631127fb8f0a7fd719cd3ae62ebe27f219bdcdd13d97edcb935c58cb183db'
//         var readStream = request.get({
//             url: imgUrl,
//             headers: { 'Referer': 'https://500px.com/popular' }
//         })
//         const filePath = path.resolve(__dirname, `../static/image`, `111.jpg`)
//         var writeStream = fs.createWriteStream(filePath)
//         readStream.pipe(writeStream);
//     })
// }
module.exports = {
    get500pxPhotos,
    qiniuUpload
}

// https://api.500px.com/v1/photos?rpp=50&feature=popular&image_size%5B%5D=1&image_size%5B%5D=2&image_size%5B%5D=32&image_size%5B%5D=31&image_size%5B%5D=33&image_size%5B%5D=34&image_size%5B%5D=35&image_size%5B%5D=36&image_size%5B%5D=2048&image_size%5B%5D=4&image_size%5B%5D=14&sort=&include_states=true&include_licensing=true&formats=jpeg%2Clytro&only=&exclude=&personalized_categories=&page=2&rpp=50


// https://api.500px.com/v1/photos?rpp=50&feature=popular&image_size%5B%5D=32&sort=&include_states=true&include_licensing=true&formats=jpeg%2Clytro&only=&exclude=&personalized_categories=&page=2&rpp=50