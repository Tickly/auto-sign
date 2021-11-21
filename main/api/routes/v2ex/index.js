import Router from '@koa/router'
import db from '@/db.js'
import cheerio from 'cheerio'
import { createHttp } from '@/api/http'

const baseURL = 'https://v2ex.com'




const sign = (cookie) => {
  const http = createHttp(cookie, { baseURL })

  return http
    .get('/mission/daily')
    .then(html => {
      console.log(html)
      const $ = cheerio.load(html)


      const box = $('#Main .box')

      // 每日登陆奖励已领取
      if (box.find('.fa-ok-sign').length) {
        return '已领取'
      }

      
      const btn = box.find('input.button')
      // 如果有领取按钮
      if (btn.length) {
        const [, once] = btn.attr('onclick').match(/=(\d+)/)
        const url = '/mission/daily/redeem?once=' + once
        http.get(url)
      }
      //   return 123

    })
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