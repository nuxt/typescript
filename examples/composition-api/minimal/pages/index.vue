<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

export default createComponent({
  setup () {
    const message = ref('This is a message')

    return {
      message
    }
  }
})
</script>
