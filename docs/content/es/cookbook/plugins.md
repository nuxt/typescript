---
title: Plugins
position: 24
description: 'Soporte de Typescript para Nuxt.js'
category: 'Cookbook'
---

## I. Inyectar en las instancias de Vue

### Plugin

```ts
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $myInjectedFunction(message: string): void
  }
}

Vue.prototype.$myInjectedFunction = (message: string) => console.log(message)
```

### Uso

```html
<template>
  <div>
    <button @click="$myInjectedFunction()">Click me !</button>
    <button @click="someMethod">Click me !</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted () {
    this.$myInjectedFunction('works in mounted')
  }
})
</script>
```

## II. Inyecta en el context

### Plugin

```ts
import { Plugin } from '@nuxt/types'

declare module '@nuxt/types' {
  interface Context {
    $myInjectedFunction(message: string): void
  }
}

const myPlugin: Plugin = (context) => {
  context.$myInjectedFunction = (message: string) => console.log(message)
}

export default myPlugin
```

### Uso

```html
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData (context) {
    context.$myInjectedFunction('works in asyncData')
  }
})
</script>
```

## III. Inyección combinada

### Plugin

```ts
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $myInjectedFunction(message: string): void
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $myInjectedFunction(message: string): void
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $myInjectedFunction(message: string): void
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  interface Store<S> {
    $myInjectedFunction(message: string): void
  }
}

const myPlugin: Plugin = (context, inject) => {
  inject('myInjectedFunction', (message: string) => console.log(message))
}

export default myPlugin
```

### Uso

```html
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted () {
    this.$myInjectedFunction('works in mounted')
  },
  asyncData (context) {
    context.app.$myInjectedFunction('works in asyncData')
  }
})
</script>
```

<alert type="info">

Por favor, nota que el `inject` no inyecta en el `context` sino en `context.app`. 

</alert>
