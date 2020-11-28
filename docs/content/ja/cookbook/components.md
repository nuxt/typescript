---
title: コンポーネント
position: 20
description: 'Nuxt.js 向け TypeScript サポート'
category: 'Cookbook'
---

[**シングルファイルコンポーネント（SFC）**](https://vuejs.org/v2/guide/single-file-components.html)では、 `script` タグに `ts` 言語を指定しないといけません：
```html
<script lang="ts">
  // TypeScript はここに記述します
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

[@vue/composition-api](https://github.com/vuejs/composition-api) プラグインを使っています。

<alert type="info">

**Plugin のインストール**

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

このプラグインの登録は、コンポーネントで `setup` 機能を使うために必要です。


</alert>

<inject-code query="shared/components/script.composition-api.ts"></inject-code>

  </tab>
  <tab name="Class API">  

[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) から [vue-class-component](https://github.com/vuejs/vue-class-component) を使用しています。

<inject-code query="shared/components/script.class-api.ts"></inject-code>

  </tab>
</tabs>
