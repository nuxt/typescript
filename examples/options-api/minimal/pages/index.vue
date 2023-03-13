<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const message: string = 'This is a message'

    return {
      message
    }
  }
})
</script>
