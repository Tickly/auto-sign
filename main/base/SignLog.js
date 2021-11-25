import { query } from '@/api/connection'
import moment from 'moment'

const getTodayStr = () => moment().format('YYYY-MM-DD')

export default {
  /**
   * 获取今日签到记录
   * @param {String} app_id
   * @param {String} task_ids 任务id，多个用逗号隔开。
   */
  getLogs(app_id, task_ids) {
    const sql = ` select * from sign
                  where date(create_at) = ?
                  and app_id = ?
                  and forum_id in (?)`
    const params = [getTodayStr(), app_id, task_ids.split(',')]
    return query(sql, params).then(logs => {
      return logs.map(log => {
        log.create_at = moment(log.create_at).format('YYYY-MM-DD HH:mm:ss')
        return log
      })
    })
  }
}