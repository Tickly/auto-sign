import TaskTable from '@/components/TaskTable'
import {h} from 'vue'

export default {
  setup() {
    return {
      appId: 2
    }
  },
  render() {
    return h(TaskTable, {
      appId: this.appId,
    })
  }
}
