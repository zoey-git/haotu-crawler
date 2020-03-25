const koa = require('koa')
const mongoose = require('./db/index')
const router = require('./router')
const app = new koa()
const bodyParser = require('koa-bodyparser')
const { handleError } = require('./middleware/error')

app.use(bodyParser())
app.use(router.routes())
app.use(handleError)

app.listen(3000, () => {
    console.log(`app listen http://localhost:3000`);
})