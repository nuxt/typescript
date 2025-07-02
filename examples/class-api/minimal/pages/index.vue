<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PageIndex extends Vue {
  message: string = 'This is a message'
}
</script>
