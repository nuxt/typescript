<template>
  <div class="container">
    <button @click="increment">
      Increment
    </button>
    <p>Counter : {{ counter }}</p>
    <button @click="decrement">
      Decrement
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ClassAPICounter extends Vue {
  counter = 0

  increment () {
    this.counter++
  }

  decrement () {
    this.counter--
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
