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

  /**
   * 签到
   * @param {Number} task_id 任务id
   */
  async sign(task_id) {
    const tasks = await this.getSignTasks()
    const task = tasks.find(t => t.id === task_id)
    if (task) {
      task.setCookie(this.cookie)
      return await task.sign(task_id)
    }
    return task
  }
}