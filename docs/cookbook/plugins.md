# Plugins

## I. Inject into Vue instances

### Declaration

`index.d.ts`:

```ts
declare module 'vue/types/vue' {
  interface Vue {
    $myInjectedFunction(message: string): void
  }
}
```

### Plugin

```ts
Vue.prototype.$myInjectedFunction = (message: string) => console.log(message)
```

### Usage

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

## II. Inject into context


### Declaration

`index.d.ts`:

```ts
declare module '@nuxt/types' {
  interface Context {
    $myInjectedFunction(message: string): void
  }
}
```

### Plugin

```ts
import { Plugin } from '@nuxt/types'

const myPlugin: Plugin = (context) => {
  context.$myInjectedFunction = (message: string) => console.log(message)
}

export default myPlugin
```

### Usage

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

## III. Combined Inject

### Declaration

`index.d.ts`:

```ts
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
```

### Plugin

```ts
import { Plugin } from '@nuxt/types'

const myPlugin: Plugin = (context, inject) => {
  inject('myInjectedFunction', (message: string) => console.log(message))
}

export default myPlugin
```

### Usage

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

::: tip
Please note that `inject` doesn't inject in `context` but in `context.app`. 
:::
