# Components

In [**Single File Components (SFC)**](https://vuejs.org/v2/guide/single-file-components.html), `script` tags must specify the `ts` language:
```html
<script lang="ts">
  // use TypeScript here
</script>
```

## Template

<<< @/cookbook/components/template.html

## Script


<tabs :options="{ useUrlFragment: false }">
  <tab name="Options API">  

<<< @/cookbook/components/script.options-api.ts

  </tab>
  <tab name="Composition API">

Using [@vue/composition-api](https://github.com/vuejs/composition-api) plugin

::: tip Plugin installation

```js
// plugins/composition-api.js
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
```

```js
// nuxt.config.js
export default {
  plugins: ['@/plugins/composition-api']
}
```

This plugin registration is mandatory to make `setup` function works in components.

:::

<<< @/cookbook/components/script.composition-api.ts

  </tab>
  <tab name="Class API">  

Using [vue-class-component](https://github.com/vuejs/vue-class-component) through [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

<<< @/cookbook/components/script.class-api.ts

  </tab>
</tabs>
