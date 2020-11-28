---
title: 组件
position: 20
description: 'Nuxt.js 的 Typescript 支持'
category: '更多使用方式'
---

在使用 [**单文件组件 (SFC)**](https://vuejs.org/v2/guide/single-file-components.html) 时， `script` 标签须指定成 `ts` 语言。
```html
<script lang="ts">
  // 这里编写 TypeScript 代码
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

使用 [@vue/composition-api](https://github.com/vuejs/composition-api) 插件

<alert type="info">

**插件安装方法**

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

此插件注册后，`setup` 才能在组件中产生作用。


</alert>

<inject-code query="shared/components/script.composition-api.ts"></inject-code>

  </tab>
  <tab name="Class API">  

通过 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) 来使用 [vue-class-component](https://github.com/vuejs/vue-class-component)

<inject-code query="shared/components/script.class-api.ts"></inject-code>

  </tab>
</tabs>
