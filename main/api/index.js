import Koa from 'koa'
import cors from '@koa/cors'
import { createRouter } from './routes'
import config from '../../config'

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


