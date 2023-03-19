<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const message: string = 'This is a message'

    return {
      message
    }
  }
})
</script>
