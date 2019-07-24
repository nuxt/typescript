<template>
  <div>{{ test.attributes.text }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Test {
  attributes: {
    text: string
  }
}

export default Vue.extend({
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
