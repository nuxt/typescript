# Components

En [**Single File Components (SFC)**](https://vuejs.org/v2/guide/single-file-components.html), `script` tags deben de especificar el lenguaje `ts`:
```html
<script lang="ts">
  // Usa TypeScript Aqui!
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

Usando el Plugin [@vue/composition-api](https://github.com/vuejs/composition-api)

::: tip Instalación del Plugin

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

El registro de este plugin es obligatorio para que el método `setup` funcione en componentes.

:::

<<< @/cookbook/components/script.composition-api.ts

  </tab>
  <tab name="Class API">

Usando [vue-class-component](https://github.com/vuejs/vue-class-component) a traves de [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

<<< @/cookbook/components/script.class-api.ts

  </tab>
</tabs>
