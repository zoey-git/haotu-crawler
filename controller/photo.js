const { get500pxPhotos, qiniuUpload } = require('../common')

module.exports = {
    async runCrawler(ctx, next) {
       
        // // 获取图片地址
        let res = await get500pxPhotos()
        res.map(item => {
            console.log(item);
            let fileName = item.name
            item.image_url.map(photo => {
                 try {
                    let res = qiniuUpload(photo, fileName)
                } catch (error) {
                    console.log(error);
                }
            })
        })
        // // 保存进七牛
        // let imgUrl = ''
        // let filePath = ''
        // let filename = ''
        // let data = await qiniuUpload(imgUrl, filePath, filename)
        // console.log(data);
        
        // ctx.body = {
        //     code: 200,
        //     data: res
        // }
    }
}