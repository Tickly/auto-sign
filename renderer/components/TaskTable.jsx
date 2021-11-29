import { Table } from 'ant-design-vue'
import { h, defineComponent, ref } from 'vue'
import http from '@/http'

export default defineComponent({
  name: 'TaskTable',
  props: {
    appId: Number,
  },
  setup(props) {
    const url = '/user/tasks'
    const dataSource = ref([])

    const columns = [
      { title: '任务名称', dataIndex: 'name' },
      {
        title: '是否签到',
        dataIndex: 'signed',
        customRender: ({ record }) => (record.signed ? '是' : '否'),
      },
      {
        title: '签到时间',
      },
      {
        title: '操作',
        customRender: ({ record }) => {
          return (
            <a-button type='primary' size='small' onClick={() => sign(record)}>
              签到
            </a-button>
          )
        },
      },
    ]


    http
      .get(url, {
        params: {
          app_id: props.appId,
        },
      })
      .then((a) => {
        console.log(a)
        dataSource.value = a.t2
      })

    const sign = (row) => {
      http.get('/user/sign', {
        params: {
          app_id: props.appId,
          task_id: row.id,
        },
      })
    }

    return {
      columns,
      dataSource,
    }
  },
  render() {
    return h(Table, {
      rowKey: 'id',
      columns: this.columns,
      dataSource: this.dataSource,
    })
  }
})