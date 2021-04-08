const path = require('path')
const fs = require('fs')

const Router = require('@koa/router')
const multer = require('@koa/multer')
const jwt = require('jsonwebtoken')

const db = require('../utils/db.js')

const router = new Router()

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

// const upload = multer({dest: 'upload_tmp/'})


router
  .get('/user', async (ctx, next) => {
    try{
        const ret = await db('select * from user')
        ctx.status = 200
        ctx.body = ret
        // res.status(200).send(ret)
    }catch(e){
      //TODO handle the exception
      console.log(e)
    }
  })
  .get('/user/:id', async (ctx, next) => {
    // console.log(ctx.params)
    const ret = await db(`select * from user where id='${ctx.params.id}'`)
    ctx.status = 200
    ctx.body = ret
  })
  .post('/user', async (ctx, next) => {
    try{
      const { body } = ctx.request
      const res = await db(`select username from user where username='${body.username}'`)
      if(res.length) {
        return ctx.body = '用户已存在'
      }
      const {insertId} = await db(`insert into user(username, password, nickname) values('${body.username}', '${body.password}', '${body.nickname}')`)
      // console.log(ret)
      const ret = await db(`select * from user where id='${insertId}'`)
      ctx.status = 200
      ctx.body = ret
      // res.status(200).send(ret)
    }catch(e){
      //TODO handle the exception
      console.log(e)
    }
  })
  .post('/user/:id', async (ctx, next) => {
    try {
      const {id} = ctx.params
      const { body } = ctx.request
      await db(`update user set username='${body.username}', password='${body.password}', nickname='${body.nickname}' where id='${id}'`)
      const ret = await db(`select * from user where id='${ctx.params.id}'`)
      ctx.status = 200
      ctx.body = ret
      // ctx.status = 200
      // ctx.body = {}
    }catch(e) {
      console.log(e)
    }
  })
  .delete('/user/:id', async (ctx, next) => {
    try {
      const ret = await db(`delete from user where id='${ctx.params.id}'`)
      ctx.status = 200
      ctx.body = {}
    }catch(e) {
      console.log(e)
    }
  })
  .post('/login', async (ctx, next) => { // 对称加密
    const user = {id: 110, name: 'wwe'}
    const token = jwt.sign(user, 'aaabbb', {expiresIn: 10})
    ctx.body = token
  })
  .post('/test', async (ctx, next) => { // 对称加密
    try{
      const authorization = ctx.headers.authorization
      const token = authorization.replace('Bearer ', '')
      const ret = jwt.verify(token, 'aaabbb')
      ctx.body = ret
    }catch(e){
      ctx.body = 'token是无效的~'
      //TODO handle the exception
    }
  })
  .post('/login1', async (ctx, next) => { // 非对称加密
    const user = {id: 110, name: 'wwe'}
    const privateKey = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'))
    const token = jwt.sign(user, privateKey, {expiresIn: 10, algorithm: 'RS256'})
    ctx.body = {...user, token}
  })
  .post('/test1', async (ctx, next) => { // 非对称加密
    try{
      const authorization = ctx.headers.authorization
      const token = authorization.replace('Bearer ', '')
      const publicKey = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'))
      
      const ret = jwt.verify(token, publicKey, {algorithm: ['RS256']})
      ctx.body = ret
    }catch(e){
      ctx.body = 'token是无效的~'
      console.log(e.message)
      //TODO handle the exception
    }
  })
  .post('/upload', upload.any(), (ctx, next) => {
    console.log(ctx.request.body);  // 上传的文件信息
    // console.log('ctx.file', ctx.file)
    // res.status(200).send({
    //   message:'文件上传成功',
    //   filename:req.files[0].originalname
    // })
    ctx.status = 200
    ctx.body = '文件上传成功'
      // filename: ctx.file.originalname
    
  })
  
module.exports = router
