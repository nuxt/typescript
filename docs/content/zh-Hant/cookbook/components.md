---
title: 元件
position: 20
description: 'Nuxt.js 的 Typescript 支援'
category: '更多使用方式'
---

在 [**單一元件檔 (SFC)**](https://vuejs.org/v2/guide/single-file-components.html) 時， `script` 標籤必須指定成 `ts` 語言。
```html
<script lang="ts">
  // 這裡編寫 TypeScript 程式碼
</script>
```

## 模板

<inject-code query="shared/components/template.html"></inject-code>

## Script


<tabs :options="{ useUrlFragment: false }">
  <tab name="Options API">  

<inject-code query="shared/components/script.options-api.ts"></inject-code>

  </tab>
  <tab name="Composition API">

使用 [@vue/composition-api](https://github.com/vuejs/composition-api) 擴充元件

<alert type="info">

**Plugin 安裝方法**

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

此 擴充元件 註冊後才能讓 `setup` 在元件中產生作用。


</alert>

<inject-code query="shared/components/script.composition-api.ts"></inject-code>

  </tab>
  <tab name="Class API">  

透過 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) 來使用 [vue-class-component](https://github.com/vuejs/vue-class-component) 

<inject-code query="shared/components/script.class-api.ts"></inject-code>

  </tab>
</tabs>
