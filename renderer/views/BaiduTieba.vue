<template>
  <div class="about">
    <a-table
      row-key="forum_id"
      :pagination="false"
      :dataSource="likes"
      :columns="columns"
    />
  </div>
</template>
<script>
import http from '@/http'
import { ref } from 'vue'

export default {
  setup() {
    const likes = ref([])

    const fetch = () => {
      http.get('/baidu/likes').then((list) => (likes.value = list))
    }

    const sign = ({ forum_id, forum_name }) => {
      http.get('/baidu/sign', { params: { forum_id, forum_name } }).then(() => {
        fetch()
      })
    }

    fetch()

    return {
      likes,
      columns: [
        {
          title: 'id',
          dataIndex: 'forum_id',
        },
        {
          title: '贴吧',
          dataIndex: 'forum_name',
          customRender: ({ record }) => {
            return (
              <div>
                <img src={record.avatar} />
                <span>{record.forum_name}</span>
              </div>
            )
          },
        },
        {
          title: '等级',
          dataIndex: 'level_id',
        },
        {
          title: '签到状态',
          customRender: ({ record }) => {
            const { signed } = record
            return signed ? '已签到' : null
          },
        },
        {
          title: '签到时间',
          dataIndex: 'sign_date',
        },
        {
          customRender: ({ record }) => (
            <div>
              {record.signed ? null : (
                <a-button onClick={() => sign(record)}>签到</a-button>
              )}
            </div>
          ),
        },
      ],
    }
  },
}
</script>
<style>
.about img {
  width: 2em;
  height: 2em;
  margin-right: 1em;
}
</style>
