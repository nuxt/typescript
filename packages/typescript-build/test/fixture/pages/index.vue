<template>
  <div>{{ text }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const text: string = 'Index Page'
    return { text }
  }
})
</script>
