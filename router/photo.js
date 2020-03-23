const KoaRouter = require('koa-router')

const router = new KoaRouter()

const { runCrawler } = require('../controller/photo')

router.post('/run_crawler', runCrawler)

module.exports = router.routes()