<template>
  <div>{{ test.attributes.text }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Test {
  attributes: {
    text: string
  }
}

export default defineComponent({
  data () {
    const test: Test = {
      attributes: {
        text: 'Interface Page'
      }
    }
    return { test }
  }
})
</script>
