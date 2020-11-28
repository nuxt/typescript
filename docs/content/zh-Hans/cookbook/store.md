---
title: Store
position: 25
description: 'Nuxt.js 的 Typescript 支持'
category: '更多使用方式'
---

在 Nuxt 项目中以 TypeScript 使用 store 的方法有多种。

## 基于类的方式

### `vuex-module-decorators`

最受欢迎的使用方式是 [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) - 查看 [指南](https://championswimmer.in/vuex-module-decorators/).


在与 Nuxt 一起使用时，有几个主要的限制条件:

1. 你的模块必须以 `stateFactory: true` 装饰器装饰，例如:

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

2. 如果你想要不在每个组件中初始化，就能访问 store，你可以使用
[initialiser plugin](https://github.com/championswimmer/vuex-module-decorators#accessing-modules-with-nuxtjs)， 例如:
   ```ts{}[store/index.ts]
   import { Store } from 'vuex'
   import { initialiseStores } from '~/utils/store-accessor'

   const initializer = (store: Store<any>) => initialiseStores(store)

   export const plugins = [initializer]
   export * from '~/utils/store-accessor'
   ```

3. 如果你想访问 Nuxt app 实例，你需要使用插件，例如:
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

[`vuex-class-component`](https://github.com/michaelolof/vuex-class-component) 是一个很有前景的、基于类的 Nuxt Store，其语法类似于 `vuex-module-decorators`。不久前它转而使用新的 API，与 Nuxt 并不完全兼容。暂时的解决方案是使用装饰器定义 Vuex 模块:

```ts
@Module({ namespacedPath: 'foo' })
export default class extends VuexModule {}
```

查看 [这个问题](https://github.com/michaelolof/vuex-class-component/issues/43) 来追踪目前在 Nuxt 遇到的兼容性问题状态。



## 原生 Vuex

### 基本类型

当你在使用 store 时，Vuex 提供了非常基本的类型。你可以使用它们为你的 store 定义提供帮助。例如:

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

在模块中，你也会使用类似的方法。例如:

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

### 访问 store

#### `nuxt-typed-vuex`

当你从 Nuxt app 中访问时，Vuex 并不提供有用的类型信息，其结果是 `this.$store` 缺少类型提示。

有一个新项目 [`nuxt-typed-vuex`](https://github.com/danielroe/nuxt-typed-vuex) - 和 [指南](https://nuxt-typed-vuex.danielcroe.com/) - 皆在试图为原生 Nuxt store 访问提供强类型标注。

#### 自己来

或者，你也可以自己提供类型信息。

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
