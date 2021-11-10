import Router from '@koa/router'
import user from './user'
import baidu from './baidu'
import v2ex from './v2ex'

const routes = [
  user,
  baidu,
  v2ex,
]

export const createRouter = app => {
  const router = new Router()

  for (const route of routes) {
    router.use('/', route.routes(), route.allowedMethods())
  }

  app
    .use(router.routes())
    .use(router.allowedMethods())
}