<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="fetch">Click Me</button>
  </div>
</template>

<script>
import http from '@/http'

export default {
  name: 'Home',
  methods: {
    fetch() {
      http.get('/user/tasks', { params: { app_id: 1 } })
    },
  },
}
</script>
