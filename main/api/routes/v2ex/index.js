import Router from '@koa/router'
import db from '@/db.js'
import { createHttp } from '../../http'

const sign = (cookie) => {
  const http = createHttp(cookie, {})
  return http.get('https://www.v2ex.com')
}

const router = new Router({
  prefix: 'v2ex',
})

router.get('/list', async ctx => {
  const config = await db.read()
  const cookie = config.v2ex
  ctx.body = await sign(cookie)
})

export default router