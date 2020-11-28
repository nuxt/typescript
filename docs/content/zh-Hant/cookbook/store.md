---
title: Store
position: 25
description: 'Nuxt.js 的 Typescript 支援'
category: '更多使用方式'
---

在 Nuxt 專案中以 TypeScript 使用 store 的方法有很多種。

## Class-based

### `vuex-module-decorators`

最受歡迎的使用方式是 [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) - 查看 [guide](https://championswimmer.in/vuex-module-decorators/).


為了與 Nuxt 一起使用，有幾個主要的限制條件:

1. 你的模組必須和 `stateFactory: true` 一起使用，例如:

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

2. 如果你不想要在每個元件中初始化並存取 store，你可以使用
[initialiser plugin](https://github.com/championswimmer/vuex-module-decorators#accessing-modules-with-nuxtjs)， 例如:
   ```ts{}[store/index.ts]
   import { Store } from 'vuex'
   import { initialiseStores } from '~/utils/store-accessor'

   const initializer = (store: Store<any>) => initialiseStores(store)

   export const plugins = [initializer]
   export * from '~/utils/store-accessor'
   ```

3. 如果你想要存取 Nuxt app 實例，你會需要對 plugin 做類似的事，例如:
   ```ts{}[plugins/axios-accessor.ts]
   import { Plugin } from '@nuxt/types'
   import { initializeAxios } from '~/utils/api'

   const accessor: Plugin = ({ $axios }) => {
     initializeAxios($axios)
   }

   export default accessor
   ```

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

[`vuex-class-component`](https://github.com/michaelolof/vuex-class-component) 的語法相似於 `vuex-module-decorators`，是一個有望成為以 class 為基底的 Nuxt store。儘管他還沒有和 Nuxt 非常相容，但不久前發佈了新的 API，暫時的替代方案是使用模組的 decorator:

```ts
@Module({ namespacedPath: 'foo' })
export default class extends VuexModule {}
```

查看 [這個問題](https://github.com/michaelolof/vuex-class-component/issues/43) 來追蹤目前在 Nuxt 遇到的相容性問題狀態。



## 原生 Vanilla

### 基本型別

當你在使用 store 時，Vuex 提供了非常基本的型別。你可以使用他們幫助你定義你的 store。例如:

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

你也會在模組當中使用一模一樣的方法。例如:

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

### 存取 store

#### `nuxt-typed-vuex`

Vuex 並沒有在你的應用程式當中提供型別給你，在 Nuxt app 中，你會得到一個沒有任何型別的 `this.$store`。

有一個新項目 [`nuxt-typed-vuex`](https://github.com/danielroe/nuxt-typed-vuex) - 和 [guide](https://nuxt-typed-vuex.danielcroe.com/) - 皆在試圖解決這個問題。

#### 自己來

或者你也可以使用自己提供的型別。

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
