const KoaRouter = require("koa-router")

const router = new KoaRouter()

router.use('/photo', require('./photo'))
router.use('/test', require('./test'))

module.exports = router