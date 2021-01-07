---
title: Plugins
position: 24
description: 'Suporte de TypeScript para Nuxt.js'
category: 'Cookbook'
---

## I. Injetar em instâncias do Vue

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
    <button @click="$myInjectedFunction()">Clique em mim !</button>
    <button @click="someMethod">Clique em mim !</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted () {
    this.$myInjectedFunction('funciondo em mounted')
  }
})
</script>
```

## II. Injetar no contexto

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
    context.$myInjectedFunction('funciona no asyncData')
  }
})
</script>
```

## III. Injeção combinada

### Plugin

```ts
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $myInjectedFunction(message: string): void
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction dentro de asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $myInjectedFunction(message: string): void
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $myInjectedFunction(message: string): void
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction dentro de stores Vuex 
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
    this.$myInjectedFunction('funcionando em mounted')
  },
  asyncData (context) {
    context.app.$myInjectedFunction('funcioando em asyncData')
  }
})
</script>
```

<alert type="info">

Por favor note que o `inject` não injeta no` context`, mas no `context.app`.

</alert>
