import { query } from '@/api/connection'

export default class App {
  constructor(id) {
    this.id = +id
    this.name = null
  }

  setName(name) {
    this.name = name
  }

  async getCookie() {
    const sql = 'select * from `cookies` where `app_id` = ?'
    const params = [this.id]
    const [row] = await query(sql, params)
    return row.cookie
  }
}