/* eslint-disable no-unused-vars */
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
  const app = Signer.getAppClass(app_id)

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

user.get('/sign', async ctx => {
  const { app_id, task_id } = ctx.request.query

  const app = Signer.getAppClass(app_id)

  await app.getCookie()

  const result = await app.sign(+task_id)

  ctx.body = result
})

export default user