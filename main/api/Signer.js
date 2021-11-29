/**
 * 签到器
 */

// eslint-disable-next-line no-unused-vars
import App from '@/base/App'
import { query } from './connection'

class Signer {
  constructor() {
    this.appMap = new Map()
    this.appClassMap = new Map()

    this.setAppMap()
  }

  async setAppMap() {
    const apps = await this.getApps()
    for (const app of apps) {
      this.appMap.set(app.id, app)
    }
  }

  /**
   * 注册一个应用，用名称来绑定，而不是用id。
   * @param {*} appName 
   * @param {*} appClass 
   */
  async registerApp(appName, appClass) {
    if (this.appClassMap.has(appName)) {
      throw new Error(`此应用${appName}已经注册过啦！`)
    }

    this.appClassMap.set(appName, appClass)
  }

  /**
   * 从数据库获取到所有的应用
   * @returns {Promise<App[]>}
   */
  getApps() {
    const sql = 'select * from apps'
    return query(sql)
  }

  getApp(id) {
    return this.appMap.get(+id)
  }

  /**
   * @param {Number} app_id 
   * @returns {App}
   */
  getAppClass(app_id) {
    const app = this.appMap.get(+app_id)
    const appClass = this.appClassMap.get(app.name)

    if (!appClass) {
      throw new Error('没有找到该应用！')
    }

    return new appClass(app_id)
  }

}

export default new Signer()