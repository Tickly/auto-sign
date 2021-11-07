import Router from '@koa/router'

const user = new Router({
  prefix: 'user'
})

user.get('/list', ctx => {
  ctx.body = [{ id: 1 }]
})

export default user