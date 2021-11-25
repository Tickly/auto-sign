/* eslint-disable no-unused-vars */
import { query } from '@/api/connection'
import SignTask from './SignTask'

export default class App {
  constructor(id) {
    this.id = +id
    this.name = null

    this.cookie = null
  }



  setName(name) {
    this.name = name
  }

  /**
   * 获取签到任务
   * @returns {SignTask[]}
   */
  getSignTasks() {

  }

  /**
   * 获取签到任务的状态
   */
  getSignTaskStatus(id) {

  }

  async getCookie() {
    const sql = 'select * from `cookies` where `app_id` = ?'
    const params = [this.id]
    const [row] = await query(sql, params)
    this.cookie = row.cookie

    console.log('get-cookie', this.cookie)
    return row
  }
}