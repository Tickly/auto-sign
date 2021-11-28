<template>
  <div class="v2ex">
    <a-table :columns="columns" :dataSource="dataSource" />
  </div>
</template>
<script>
import http from '@/http'
import { ref } from 'vue'

export default {
  setup() {
    const url = '/user/tasks'

    http
      .get(url, {
        params: {
          app_id: 2,
        },
      })
      .then((a) => {
        console.log(a)
        dataSource.value = a.t2
      })

    const dataSource = ref([])

    const columns = [
      { title: '任务名称', dataIndex: 'name' },
      {
        title: '是否签到',
        dataIndex: 'signed',
        customRender: (row) => (row.signed ? '是' : '否'),
      },
      {
        title: '签到时间',
      },
      {
        title: '操作',
        customRender: () => {
          return (
            <a-button type='primary' size='small'>
              签到
            </a-button>
          )
        },
      },
    ]

    return {
      columns,
      dataSource,
    }
  },
}
</script>
