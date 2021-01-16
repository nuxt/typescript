---
title: Componentes
position: 20
description: 'Suporte de TypeScript para Nuxt.js'
category: 'Cookbook'
---

Em [**Single File Components (SFC)**](https://vuejs.org/v2/guide/single-file-components.html), as tags `script` devem especificar a linguagem `ts`:
```html
<script lang="ts">
  // use TypeScript aqui
</script>
```

## Modelo

<inject-code query="shared/components/template.html"></inject-code>

## Script


<tabs :options="{ useUrlFragment: false }">
  <tab name="Options API">  
  <inject-code query="shared/components/script.options-api.ts"></inject-code>
  </tab>
  <tab name="Composition API">

Usando o plugin [@vue/composition-api](https://github.com/vuejs/composition-api) 

<alert type="info">

**Instalação do plugin**

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

Esse registo do plugin é obrigatório para fazer a função `setup` funcionar em componentes.


</alert>

  <inject-code query="shared/components/script.composition-api.ts"></inject-code>

  </tab>
  <tab name="Class API">  

Usando [vue-class-component](https://github.com/vuejs/vue-class-component) através do [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

<inject-code query="shared/components/script.class-api.ts"></inject-code>

  </tab>
</tabs>
