const KoaRouter = require('koa-router')

const router = new KoaRouter()

const { Test } = require('../controller/test')

router.post('/test', Test)

module.exports = router.routes()