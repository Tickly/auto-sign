import Router from '@koa/router'
import user from './user'
import baidu from './baidu'

const routes = [
  user, baidu,
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