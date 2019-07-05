<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { createComponent, value } from 'vue-function-api'

export default createComponent({
  setup() {
    const message = value('This is a message')

    return {
      message
    }
  }
})
</script>
