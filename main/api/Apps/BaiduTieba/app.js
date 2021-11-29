import { createHttp } from '@/api/http'
import App from '@/base/App'
import Task from './Task'
export default class BaiduTiebaApp extends App {

  /**
   * 获取任务列表
   */
  getSignTasks() {
    const http = createHttp(this.cookie, { baseURL: 'http://tieba.baidu.com' })
    const url = '/mg/o/getForumHome'
    return http.get(url).then(res => res.data.like_forum.list.map(forum => new Task({ id: forum.forum_id, name: forum.forum_name })))
  }
}