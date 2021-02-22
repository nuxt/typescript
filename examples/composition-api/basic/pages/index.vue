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
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup () {
    const counter = ref(0)

    const increment = () => counter.value++
    const decrement = () => counter.value--

    return {
      counter,
      increment,
      decrement
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
