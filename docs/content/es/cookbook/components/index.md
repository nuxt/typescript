# Componentes

En [**Single File Components (SFC)**](https://vuejs.org/v2/guide/single-file-components.html), los tags `script` deben especificar el lenguaje `ts`:
```html
<script lang="ts">
  // usar TypeScript aqui
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

Usando el plugin [@vue/composition-api](https://github.com/vuejs/composition-api)

::: tip Instalacion del Plugin

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

La instalación de este plugin es obligatorio para que la función `setup` funcione en componentes.

:::

<<< @/cookbook/components/script.composition-api.ts

  </tab>
  <tab name="Class API">  

Usando [vue-class-component](https://github.com/vuejs/vue-class-component) mediante [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

<<< @/cookbook/components/script.class-api.ts

  </tab>
</tabs>
