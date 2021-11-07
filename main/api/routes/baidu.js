import Router from '@koa/router'
import BaiduAccount from './Baidu/BaiduAccount'

const router = new Router({
  prefix: 'baidu'
})

router
  .get('/likes', async ctx => {
    const user = await BaiduAccount.getUser()
    ctx.body = await user.getLikes()
  })
  .get('/sign', async ctx => {
    const user = await BaiduAccount.getUser()
    ctx.body = await user.signAll()
  })

export default router