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
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      counter: 0
    }
  },
  methods: {
    increment (): void {
      this.counter++
    },
    decrement (): void {
      this.counter--
    }
  }
})
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
