import App from '@/base/App'
import SignTask from '@/base/SignTask'

export default class V2exApp extends App {
  getSignTasks() {
    return [
      new SignTask({
        id: 1,
        name: '登录奖励'
      })
    ]
  }
}