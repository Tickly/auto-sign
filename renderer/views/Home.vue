<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
import http from '@/http'

export default {
  name: 'Home',
  mounted() {
    http.get('/user/tasks', { params: { app_id: 1 } })
  },
}
</script>
