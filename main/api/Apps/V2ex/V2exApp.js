import App from '@/base/App'
import DailyTask from './DailyTask'

export default class V2exApp extends App {
  async getSignTasks() {
    return [
      new DailyTask({
        id: 1,
        name: '登录奖励'
      })
    ]
  }

  
}