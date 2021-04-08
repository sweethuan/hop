const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const kosStatic = require('koa-static')

const router = require('./router/index')

const app = new Koa()

app.use(bodyParser())

// 开放静态资源
app.use(kosStatic('./uploads'))

// 错误i处理
/* app.use((ctx, next) => {
  ctx.app.emit('error', new Error("错误了"), ctx)
})

app.on('error', (err, ctx) => {
  console.log(err.message)
  ctx.body = err.message
}) */

app.use(router.routes());
app.use(router.allowedMethods());



app.listen(8888, () => {
  console.log('server is run at localhost:8888')
})