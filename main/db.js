import path from 'path'
import fs from 'fs'

const filepath = path.resolve(__dirname, '../config/db.json')

export default {
  async read() {
    const data = await fs.promises.readFile(filepath, 'utf-8')
    return JSON.parse(data)
  },
  write() {
  },
}