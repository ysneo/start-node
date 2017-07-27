const fs = require('fs')
const Koa = require('koa')
const app = new Koa()

// const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const controller = require('./controller.js')

app.use(async(ctx, next) => {
    await next()
    console.log(ctx.url);

})

app.use(bodyParser())
app.use(controller())

app.listen(2300)