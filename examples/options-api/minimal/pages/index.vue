<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    const message: string = 'This is a message'

    return {
      message
    }
  }
})
</script>
