import Router from '@koa/router'
import Signer from '../Signer'


const user = new Router({
  prefix: 'user'
})

user.get('/apps', async ctx => {
  ctx.body = await Signer.getApps()
})

user.get('/tasks', async ctx => {
  const { app_id } = ctx.request.query
  const appClass = Signer.getAppClass(app_id)

  if (!appClass) {
    throw new Error('没有找到该应用！')
  }

  const app = new appClass(app_id)

  ctx.body = await app.getCookie()
})

export default user