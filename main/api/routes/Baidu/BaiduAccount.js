import axios from 'axios'
import md5 from 'md5'
import db from '@/db.js'

const createHttp = (cookie) => {
  const http = axios.create({
    baseURL: 'http://tieba.baidu.com',
    headers: {
      cookie,
    }
  })
  http.interceptors.response.use(res => res.data)
  return http
}

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
    this.http = createHttp(cookie)
  }


  /**
   * 签到单个贴吧
   */
  async sign(fid, kw) {
    const tbs = await this.getTbs()
    const sp = new URLSearchParams()

    const [k, v] = this.cookie.split('=')
    sp.set(k, v)

    sp.set('fid', fid)
    sp.set('kw', kw)
    sp.set('tbs', tbs)

    const sign = getSign(sp)
    sp.set('sign', sign)

    const url = '/c/c/forum/sign'
    return this.http.post(url, {}, { params: sp })
      .then(res => {

        const response = {
          signTarget: {
            id: fid,
            name: kw,
          },
          signResult: res,
        }

        return response
      })
  }

  /**
   * 签到所有贴吧
   */
  async signAll() {
    const list = await this.getLikes()
    const queue = list.map(({ forum_name, forum_id }) => this.sign(forum_id, forum_name))
    return Promise.all(queue)
  }

  /**
   * 获取关注贴吧列表
   */
  getLikes() {
    const url = '/mg/o/getForumHome'
    return this.http.get(url).then(res => res.data.like_forum.list)
  }


  getTbs() {
    const url = '/dc/common/tbs'
    return this.http.get(url).then(res => {
      return res.tbs
    })
  }

  static async getUser() { 
    const config = await db.read()
    const user = new BaiduAccount()
    user.loadConfig(config)
    return user
  }
}