<template>
  <div class="about">
    <a-table rowkey="forum_id" :pagination="false" :dataSource="likes" :columns="columns" />
  </div>
</template>
<script>
import http from '@/http'
import { ref } from 'vue'

export default {
  setup() {
    const likes = ref([])

    http.get('/baidu/likes').then((list) => (likes.value = list))

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

      ],
    }
  },
}
</script>
