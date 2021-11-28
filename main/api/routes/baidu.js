import Router from '@koa/router'
import { query } from '../connection'
import BaiduAccount from './Baidu/BaiduAccount'
import moment from 'moment'

const getTodayStr = () => moment().format('YYYY-MM-DD')


const router = new Router({
  prefix: 'baidu'
})


const Log = ({ forum_id }) => {
  const date = moment().format('YYYY-MM-DD HH:mm:ss')
  const sql = 'INSERT INTO `autosign`.`sign` (`create_at`, `forum_id`,`app_id`) VALUES (?, ?, ?);'
  const params = [date, forum_id, 1]
  return query(sql, params)
}

/**
 * 根据贴吧id，从数据库中查询今天的签到记录
 * @param {String[]} fids 贴吧id列表
 */
const getLogsByFids = fids => {
  const sql = 'select * from `sign` where date(`create_at`) = ? and `forum_id` in (?)'
  const params = [getTodayStr(), fids]
  return query(sql, params)
}

router
  .get('/likes', async ctx => {
    const user = await BaiduAccount.getUser()
    const likes = await user.getLikes()
    const fids = likes.map(i => i.forum_id)
    const logs = await getLogsByFids(fids)
    ctx.body = likes.map(v => {
      const { forum_id } = v
      const log = logs.find(l => l.forum_id === forum_id)
      // 是否已签到
      const signed = !!log
      // 签到时间
      const sign_date = log ? moment(log.create_at).format('YYYY-MM-DD HH:mm:ss') : null

      return {
        ...v,
        signed,
        sign_date,
      }
    })
  })
  // 签到
  .get('/sign', async ctx => {
    const { forum_id } = ctx.request.query

    // 先拿到用户
    const user = await BaiduAccount.getUser()
    // 判断今天该贴吧有没有签到过
    const signLog = await user.isSignToday(forum_id)

    // 为0表示没有签到过
    if (signLog.length === 0) {
      // 进行签到
      const signResult = await user.sign(ctx.request.query)

      // 签到成功 or 已经签到
      if (signResult.error_code === '0' || signResult.error_code === '160002') {
        // 插入一条数据到数据库里记录
        // 暂时不对数据库操作判断，不考虑插入失败的情况
        await Log(ctx.request.query)
      }

      ctx.body = signResult
    } else {
      // 如果签到过了
      ctx.body = signLog
    }
  })

export default router