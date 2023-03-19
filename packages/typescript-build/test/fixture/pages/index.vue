<template>
  <div>{{ text }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const text: string = 'Index Page'
    return { text }
  }
})
</script>
