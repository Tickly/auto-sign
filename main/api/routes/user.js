/* eslint-disable no-unused-vars */
import App from '@/base/App'
import SignLog from '@/base/SignLog'
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

  /**
   * @type {App}
   */
  const app = new appClass(app_id)

  await app.getCookie()

  const tasks = await app.getSignTasks()

  const logs = await SignLog.getLogs(app.id, tasks.map(task => task.id).join(','))

  ctx.body = { tasks, logs }
})

export default user