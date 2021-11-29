import { createHttp } from '@/api/http'
import SignTask from '@/base/SignTask'

export default class Task extends SignTask {


  createHttp() {
    return createHttp('', { baseURL: 'http://tieba.baidu.com' })
  }

  getTbs() {
    const url = '/dc/common/tbs'
    return this.http.get(url).then(res => {
      return res.tbs
    })
  }

  async sign(forum_id) {
    console.log('forum_id', forum_id)
    return this.getTbs()
  }
}