<template>
  <div class="about">
    <a-table row-key="forum_id" :pagination="false" :dataSource="likes" :columns="columns" />
  </div>
</template>
<script>
import http from '@/http'
import { ref } from 'vue'

export default {
  setup() {
    const likes = ref([])

    http.get('/baidu/likes').then((list) => (likes.value = list))

    http.get('/baidu/test')

    return {
      likes,
      columns: [
        {
          title: '贴吧',
          dataIndex: 'forum_name',
        },
        {
          title: '等级',
          dataIndex: 'level_id',
        },
        {
          title: '状态',
          customRender: ({ record }) => {
            const { signResult: { error_msg } } = record
            return error_msg
          }
        },
        {
          customRender: () => <div>
            <a-button>签到</a-button>
          </div>
        }
      ],
    }
  },
}
</script>
