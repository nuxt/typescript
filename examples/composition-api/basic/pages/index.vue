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
import VueCompositionApi, { defineComponent, ref } from '@vue/composition-api'

Vue.use(VueCompositionApi)

export default defineComponent({
  name: 'CompositionAPICounter',
  setup () {
    const counter = ref(0)

    function increment () {
      counter.value++
    }

    function decrement () {
      counter.value--
    }

    return { counter, increment, decrement }
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
