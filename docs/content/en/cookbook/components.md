---
title: Components
position: 20
description: TypeScript Support for Nuxt.js
category: Cookbook
---

In [**Single File Components (SFC)**](https://vuejs.org/v2/guide/single-file-components.html), `script` tags must specify the `ts` language:
```html
<script lang="ts">
  // use TypeScript here
</script>
```

## Template

<inject-code query="shared/components/template.html"></inject-code>

## Script


<tabs :options="{ useUrlFragment: false }">
  <tab name="Options API">  
  <inject-code query="shared/components/script.options-api.ts"></inject-code>
  </tab>
  <tab name="Composition API">

Using [@vue/composition-api](https://github.com/vuejs/composition-api) plugin

<alert type="info">

**Plugin installation**

```js{}[plugins/composition-api.js]
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
```

```js{}[nuxt.config.js]
export default {
  plugins: ['@/plugins/composition-api']
}
```

This plugin registration is mandatory to make `setup` function works in components.


</alert>

  <inject-code query="shared/components/script.composition-api.ts"></inject-code>

  </tab>
  <tab name="Class API">  

Using [vue-class-component](https://github.com/vuejs/vue-class-component) through [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

<inject-code query="shared/components/script.class-api.ts"></inject-code>

  </tab>
</tabs>
