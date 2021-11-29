/* eslint-disable no-unused-vars */

import { createHttp } from '@/api/http'
import SignTask from '@/base/SignTask'
import V2exApp from './V2exApp'
import cheerio from 'cheerio'

const baseURL = 'https://v2ex.com'


export default class DailyTask extends SignTask {
  /**
   * 
   * @param {V2exApp} app 
   */
  check(app) {
    const http = createHttp(app.cookie, { baseURL })

    return http.get('/mission/daily').then(html => {
      const $ = cheerio.load(html)

      const box = $('#Main .box')

      return box.find('.fa-ok-sign').length > 0
    })
  }

  sign() {
    this.signed = true
  }
}