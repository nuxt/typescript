# 元件

在 [**單一元件檔 (SFC)**](https://vuejs.org/v2/guide/single-file-components.html) 時， `script` 標籤必須指定成 `ts` 語言。
```html
<script lang="ts">
  // 這裡編寫 TypeScript 程式碼
</script>
```

## 模板

<<< @/cookbook/components/template.html

## Script


<tabs :options="{ useUrlFragment: false }">
  <tab name="Options API">  

<<< @/cookbook/components/script.options-api.ts

  </tab>
  <tab name="Composition API">

使用 [@vue/composition-api](https://github.com/vuejs/composition-api) 擴充元件

::: tip Plugin 安裝方法

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

此 擴充元件 註冊後才能讓 `steup` 在元件中產生作用。

:::

<<< @/cookbook/components/script.composition-api.ts

  </tab>
  <tab name="Class API">  

透過 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) 來使用 [vue-class-component](https://github.com/vuejs/vue-class-component) 

<<< @/cookbook/components/script.class-api.ts

  </tab>
</tabs>
