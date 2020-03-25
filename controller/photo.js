const { get500pxPhotos, qiniuUpload } = require('../common')
const Photo = require('../model/photo')
const Crawler = require('../model/crawler')
const schedule = require('node-schedule');

module.exports = {
    async runCrawler(ctx, next) {
        schedule.scheduleJob('30 * * * * *', async ()=>{
            const oldPage = await Crawler.findOne({_id: '5e7ae9e9ce280a4664eb174d'})
            await Crawler.updateOne({_id: '5e7ae9e9ce280a4664eb174d'}, { currentPage: ++oldPage.currentPage })
            // 获取图片地址
            let res = await get500pxPhotos(oldPage.currentPage, oldPage.pageSize)
            let photos = []
            let photosData = []
            res.map(item => {
                photos.push(item.image_url)
                let imageName = item.image_url[item.image_url.length - 1].match(/sig=\w+/)[0]
                let detailName = item.image_url[1].match(/sig=\w+/)[0]
                let miniName = item.image_url[0].match(/sig=\w+/)[0]
                photosData.push({
                    privacy: item.privacy,
                    image_url: `http://q6pmg0ho4.bkt.clouddn.com/${imageName}`,
                    detail_url: `http://q6pmg0ho4.bkt.clouddn.com/${detailName}`,
                    mini_url: `http://q6pmg0ho4.bkt.clouddn.com/${miniName}`,
                    width: item.width,
                    height: item.height,
                    image_format: item.image_format,
                    description: item.description,
                    comments_count: 0,
                    votes_count: 0,
                    background_color: '#fff'
                })
            })
        
            try {
                let imageList = [].concat.apply([], photos)
                // 保存进七牛云
                qiniuUpload(imageList)
                // 图片地址存到数据库
            } catch (error) {
                console.log('error', error);
            }
            try {
                let mongoResult = await Photo.insertMany(photosData)
                ctx.body = {
                    code: 200,
                    data: mongoResult
                }
            } catch (error) {
                ctx.body = {
                    code: 301,
                    data: error
                }
            }
        })
    }
}