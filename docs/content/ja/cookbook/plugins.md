---
title: プラグイン
position: 24
description: 'Nuxt.js 向け TypeScript サポート'
category: 'Cookbook'
---

## I. Vue インスタンスにインジェクトする

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

### 使用方法

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

## II. コンテキストにインジェクトする

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

### 使用方法

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

## III. 複合インジェクト

### Plugin

```ts
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $myInjectedFunction(message: string): void
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $myInjectedFunction(message: string): void
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $myInjectedFunction(message: string): void
  }
}

const myPlugin: Plugin = (context, inject) => {
  inject('myInjectedFunction', (message: string) => console.log(message))
}

export default myPlugin
```

### 使用方法

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

`inject` は `context` ではなく `context.app` にインジェクトされることに注意してください。 

</alert>
