const koa = require('koa')
const mongoose = require('./db/index')
const router = require('./router')
const app = new koa()
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())
app.use(router.routes())

app.listen(3000, () => {
    console.log(`app listen http://localhost:3000`);
})