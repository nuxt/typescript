# コンポーネント

[**シングルファイルコンポーネント（SFC）**](https://vuejs.org/v2/guide/single-file-components.html)では、 `script` タグに `ts` 言語を指定しないといけません：
```html
<script lang="ts">
  // TypeScript はここに記述します
</script>
```

## Template

<<< @/ja/cookbook/components/template.html

## Script


<tabs :options="{ useUrlFragment: false }">
  <tab name="Options API">  

<<< @/ja/cookbook/components/script.options-api.ts

  </tab>
  <tab name="Composition API">

[@vue/composition-api](https://github.com/vuejs/composition-api) プラグインを使っています。

::: tip Plugin のインストール

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

このプラグインの登録は、コンポーネントで `setup` 機能を使うために必要です。

:::

<<< @/ja/cookbook/components/script.composition-api.ts

  </tab>
  <tab name="Class API">  

[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) から [vue-class-component](https://github.com/vuejs/vue-class-component) を使用しています。

<<< @/ja/cookbook/components/script.class-api.ts

  </tab>
</tabs>
