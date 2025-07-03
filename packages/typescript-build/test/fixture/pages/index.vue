<template>
  <div>{{ text }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    const text: string = 'Index Page'
    return { text }
  }
})
</script>
