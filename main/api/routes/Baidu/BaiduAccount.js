import md5 from 'md5'
import db from '@/db.js'
import moment from 'moment'
import { query } from '../../connection'
import { createHttp } from '../../http'


/**
 * @param {URLSearchParams} params 
 * @returns {String}
 */
const getSign = params => {
  let str = ''

  params.forEach((v, k) => {
    str += `${k}=${v}`
  })

  return md5(str + 'tiebaclient!!!').toUpperCase()
}

export default class BaiduAccount {
  loadConfig(config) {
    const cookie = config.baidu

    this.cookie = cookie
    this.http = createHttp(cookie, { baseURL: 'http://tieba.baidu.com' })
  }


  /**
   * 签到单个贴吧
   */
  async sign(forum) {
    const { forum_id, forum_name } = forum

    const tbs = await this.getTbs()
    const sp = new URLSearchParams()

    const [k, v] = this.cookie.split('=')
    sp.set(k, v)

    sp.set('fid', forum_id)
    sp.set('kw', forum_name)
    sp.set('tbs', tbs)

    const sign = getSign(sp)
    sp.set('sign', sign)

    const url = '/c/c/forum/sign'
    return this.http.post(url, {}, { params: sp })
  }

  /**
   * 签到所有贴吧
   */
  async signAll() {
    const list = await this.getLikes()
    const queue = list.map(i => this.sign(i).then(signResult => ({ ...i, signResult })))
    return Promise.all(queue)
  }

  /**
   * 获取关注贴吧列表
   * @returns {Array}
   */
  getLikes() {
    const url = '/mg/o/getForumHome'
    return this.http.get(url).then(res => res.data.like_forum.list)
  }



  /**
   * 判断今天是否签到
   */
  isSignToday(forum_id) {
    const sql = `SELECT * FROM autosign.sign
        where date(create_at) = ?
        and forum_id = ?;`
    const params = [moment().format('YYYY-MM-DD'), forum_id]

    return query(sql, params)
  }

  static async getUser() {
    const config = await db.read()
    const user = new BaiduAccount()
    user.loadConfig(config)
    return user
  }
}