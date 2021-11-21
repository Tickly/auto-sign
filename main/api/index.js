import Koa from 'koa'
import cors from '@koa/cors'
import { createRouter } from './routes'
import config from '../../config'
import Signer from './Signer'
import BaiduTiebaApp from './Apps/BaiduTieba/app'

Signer.registerApp('百度贴吧', BaiduTiebaApp)


export const createApi = () => {
  const app = new Koa()

  app.use(cors())

  createRouter(app)



  app.use(async ctx => {
    ctx.body = 'Hello World'
  })

  app.listen(config.port)

  console.log('Api 服务已启动')
}


