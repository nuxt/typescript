# Componentes

En [**Single File Components (SFC)**](https://vuejs.org/v2/guide/single-file-components.html), as tags `script` devem especificar a linguagem ` ts`:
```html
<script lang="ts">
  // usar TypeScript aqui
</script>
```

## Modelo

<<< @/cookbook/components/template.html

## Script


<tabs :options="{ useUrlFragment: false }">
  <tab name="Options API">  

<<< @/cookbook/components/script.options-api.ts

  </tab>
  <tab name="Composition API">

Usando o plugin [@vue/composition-api](https://github.com/vuejs/composition-api) 

::: tip de instalação do plugin

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

Este registo do plugin é obrigatório para fazer a função "setup" funciona em componentes.

:::

<<< @/cookbook/components/script.composition-api.ts

  </tab>
  <tab name="Class API">  

Usando [vue-class-component](https://github.com/vuejs/vue-class-component) através do [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

<<< @/cookbook/components/script.class-api.ts

  </tab>
</tabs>
