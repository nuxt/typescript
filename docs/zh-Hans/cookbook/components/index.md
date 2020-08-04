# 组件

在使用 [**单文件组件 (SFC)**](https://vuejs.org/v2/guide/single-file-components.html) 时， `script` 标签须指定成 `ts` 语言。
```html
<script lang="ts">
  // 这里编写 TypeScript 代码
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

使用 [@vue/composition-api](https://github.com/vuejs/composition-api) 插件

::: tip 插件安装方法

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

此插件注册后，`steup` 才能在组件中产生作用。

:::

<<< @/cookbook/components/script.composition-api.ts

  </tab>
  <tab name="Class API">  

通过 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) 来使用 [vue-class-component](https://github.com/vuejs/vue-class-component)

<<< @/cookbook/components/script.class-api.ts

  </tab>
</tabs>
