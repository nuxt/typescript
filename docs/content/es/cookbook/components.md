---
title: Componentes
position: ''
description: TypeScript Support for Nuxt.js
category: ''
---

En [**Single File Components (SFC)**](https://vuejs.org/v2/guide/single-file-components.html), los tags `script` deben especificar el lenguaje `ts`:
```html
<script lang="ts">
  // usar TypeScript aqui
</script>
```

## Template

<inject-code query="shared/cookbook/components/template.html"></inject-code>

## Script


<tabs :options="{ useUrlFragment: false }">
  <tab name="Options API">  

<inject-code query="shared/cookbook/components/script.options-api.ts"></inject-code>

  </tab>
  <tab name="Composition API">

Usando el plugin [@vue/composition-api](https://github.com/vuejs/composition-api)

<alert type="info">

**Instalacion del Plugin**

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

La instalación de este plugin es obligatorio para que la función `setup` funcione en componentes.


</alert>

<inject-code query="shared/cookbook/components/script.composition-api.ts"></inject-code>

  </tab>
  <tab name="Class API">  

Usando [vue-class-component](https://github.com/vuejs/vue-class-component) mediante [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

<inject-code query="shared/cookbook/components/script.class-api.ts"></inject-code>

  </tab>
</tabs>
