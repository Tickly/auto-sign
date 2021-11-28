/* eslint-disable no-unused-vars */
import App from '@/base/App'
import SignLog from '@/base/SignLog'
import SignTask from '@/base/SignTask'
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

  const t2 = tasks.map(t => {
    const task = new SignTask(t)

    task.signed = logs.some(log => log.forum_id === task.id)

    return task
  })

  ctx.body = { tasks, logs, t2 }
})

export default user