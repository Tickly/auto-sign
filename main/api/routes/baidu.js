import Router from '@koa/router'
import connection from '../connection'
import BaiduAccount from './Baidu/BaiduAccount'

const router = new Router({
  prefix: 'baidu'
})

router
  .get('/likes', async ctx => {
    const user = await BaiduAccount.getUser()
    ctx.body = await user.signAll()
  })
  .get('/sign', async ctx => {
    const user = await BaiduAccount.getUser()
    ctx.body = await user.signAll()
  })
  .get('/test', ctx => {

    ctx.body = 1
    connection.query('select * from sign', function (error, results) {
      if (error) {
        throw error
      }
      console.log(results)
    })
  })

export default router