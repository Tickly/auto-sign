<template>
  <div class="v2ex">
    <a-table />
  </div>
</template>
<script>
import http from '@/http'

export default {
  setup() {
    const url = '/v2ex/list'
    http.get(url)
  }
}
</script>