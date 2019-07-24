<template>
  <div>{{ text }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    const text: string = 'Index Page'
    return { text }
  }
})
</script>
