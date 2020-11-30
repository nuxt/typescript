---
title: ストア
position: 25
description: 'Nuxt.js 向け TypeScript サポート'
category: 'Cookbook'
---

TypeScript を使用している Nuxt プロジェクトでは、ストアにアクセスしたり、書き込んだりするためにさまざまなオプションがあります。

## クラスベース

### `vuex-module-decorators`

最も人気のあるアプローチの1つは [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) です。- [ガイド](https://championswimmer.in/vuex-module-decorators/)を参照してください。


Nuxt で使用するために重要な条件がいくつかあります：

1. モジュールは `stateFactory: true` で装飾する必要があるため、以下のようにします:

   ```ts{}[store/mymodule.ts]
   import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

   @Module({
     name: 'mymodule',
     stateFactory: true,
     namespaced: true,
   })
   class MyModule extends VuexModule {
     wheels = 2

     @Mutation
     incrWheels(extra) {
       this.wheels += extra
     }

     get axles() {
       return this.wheels / 2
     }
   }
   ```

2. 各コンポーネントで初期化せずにストアにアクセスした場合は、[initialiser plugin](https://github.com/championswimmer/vuex-module-decorators#accessing-modules-with-nuxtjs) を使用してアクセスすることができます。例：
   ```ts{}[store/index.ts]
   import { Store } from 'vuex'
   import { initialiseStores } from '~/utils/store-accessor'

   const initializer = (store: Store<any>) => initialiseStores(store)

   export const plugins = [initializer]
   export * from '~/utils/store-accessor'
   ```

3. Nuxt アプリケーションインスタンスにアクセスしたい場合は、プラグインと同様に設定を行う必要があります。例：
   ```ts{}[plugins/axios-accessor.ts]
   import { Plugin } from '@nuxt/types'
   import { initializeAxios } from '~/utils/api'

   const accessor: Plugin = ({ $axios }) => {
     initializeAxios($axios)
   }

   export default accessor
   ```

   プラグインを忘れずに `nuxt.config.js` ファイルに追加してください。

   ```ts{}[utils/api.ts]
   import { NuxtAxiosInstance } from '@nuxtjs/axios'

   let $axios: NuxtAxiosInstance

   export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
     $axios = axiosInstance
   }
   
   export { $axios }
   ```

   ```ts{}[store/users.ts]
   import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
   import { $axios } from '~/utils/api'
   import { User } from '~/types'

   @Module({
     name: 'users',
     stateFactory: true,
     namespaced: true,
   })
   class UserModule extends VuexModule {
     users: User[] = []

     @Mutation
     setUsers(users: User[]) {
       this.users = users
     }

     @Action
     async getUsers() {
       const users = $axios.$get('/users')
       this.setUsers(users)
     }
   }
   ```

### `vuex-class-component`

[`vuex-class-component`](https://github.com/michaelolof/vuex-class-component) は Nuxt ストアに対する非常に有望なクラスベースのアプローチであり、シンタックスは `vuex-module-decorators` にとても似ています。新しい API をリリースしましたが、Nuxt との互換性は完全ではありません。回避策はデコレーターでモジュールを定義することです。

```ts
@Module({ namespacedPath: 'foo' })
export default class extends VuexModule {}
```

Nuxt との互換性問題の現在の状態については、[このイシュー](https://github.com/michaelolof/vuex-class-component/issues/43)を参照してください。

## Vanilla

### 基本的なタイピング

Vuex はストアを使用するために非常に基本的な型を提供しています。これらを使用してストアを定義することができます。例：

```ts{}[store/index.ts]
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  things: [] as string[],
  name: 'Me',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: state => state.name,
}

export const mutations: MutationTree<RootState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
}

export const actions: ActionTree<RootState, RootState> = {
  fetchThings({ commit }) {
    const things = this.$axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'New name')
  },
}
```

モジュールに対しても同様のことができます。例：

`~/store/anotherModule.ts`:
```ts
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  more: 3,
})

export type AnotherModuleState = ReturnType<typeof state>

export const getters: GetterTree<AnotherModuleState, RootState> = {
  evenMore: state => state.more + 5,
  nameAndMore: (state, getters, rootState) => `${rootState.name}: ${state.more}`,
}

export const actions: ActionTree<AnotherModuleState, RootState> = {
  printRootState({ rootState }) {
    console.log('accessing rootState:', rootState.name)
  },
}
```

### ストアへのアクセス

#### `nuxt-typed-vuex`

Vuex はアプリケーションからストアへアクセスするための便利な型を提供していません。`this.$store` は Nuxt アプリケーションで型指定されていないままです。

[`nuxt-typed-vuex`](https://github.com/danielroe/nuxt-typed-vuex) という新しいプロジェクトがあり（[ガイド](https://nuxt-typed-vuex.danielcroe.com/)）、このプロジェクトは素の Nuxt ストアに強く型付けされたアクセサーを提供することで上述の件を改善することを目的としています。

#### 自前のものを使う

もう1つの方法としては、使用時に自前の型を提供することができます。

```ts{}[components/MyComponent.vue]
<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import { getters, RootState } from '~/store'

@Component
export default class MyComponent extends Vue {
    get myThings() {
        return (this.$store.state as RootState).things
    }

    mounted() {
        const name = this.$store.getters['name'] as ReturnType<typeof getters.name>
    }
}
```
