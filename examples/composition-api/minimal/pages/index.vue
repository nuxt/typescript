<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'

export default createComponent({
  setup () {
    const message = reactive('This is a message')

    return {
      message
    }
  }
})
</script>
