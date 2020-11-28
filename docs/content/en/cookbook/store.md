---
title: Store
position: 25
description: TypeScript Support for Nuxt.js
category: Cookbook
---

There are a number of different options for writing and accessing the store in a Nuxt project using TypeScript.

## Class-based

### `vuex-module-decorators`

One of the most popular approaches is [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) - see [guide](https://championswimmer.in/vuex-module-decorators/).


For use with Nuxt, there are few key provisions:

1. Your modules must be decorated with `stateFactory: true`, so for example:

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

2. If you want to access the store without initialising it in each component, you can do so using an [initialiser plugin](https://github.com/championswimmer/vuex-module-decorators#accessing-modules-with-nuxtjs), for example:
   ```ts{}[store/index.ts]
   import { Store } from 'vuex'
   import { initialiseStores } from '~/utils/store-accessor'

   const initializer = (store: Store<any>) => initialiseStores(store)

   export const plugins = [initializer]
   export * from '~/utils/store-accessor'
   ```

3. If you want to access the Nuxt app instance, you will need to do something similar with a plugin, for example:
   ```ts{}[plugins/axios-accessor.ts]
   import { Plugin } from '@nuxt/types'
   import { initializeAxios } from '~/utils/api'

   const accessor: Plugin = ({ $axios }) => {
     initializeAxios($axios)
   }

   export default accessor
   ```

   Don't forget to add the plugin to your `nuxt.config.js` file.

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
       const users = await $axios.$get('/users')
       this.setUsers(users)
     }
   }
   ```

### `vuex-class-component`

[`vuex-class-component`](https://github.com/michaelolof/vuex-class-component) is a very promising class-based approach to the Nuxt store, and the syntax is very similar to `vuex-module-decorators`. It has just released a new API, although it is not yet compatible in its entirety with Nuxt. The workaround is to define modules with a decorator:

```ts
@Module({ namespacedPath: 'foo' })
export default class extends VuexModule {}
```

See [this issue](https://github.com/michaelolof/vuex-class-component/issues/43) for the current status of the compatibility issue with Nuxt.

## Vanilla

### Basic typing

Vuex supplies very basic types for use with the store. You can use these to help define your store. For example:

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
  async fetchThings({ commit }) {
    const things = await this.$axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'New name')
  },
}
```

You would do exactly the same for a module. For example:

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

### Accessing the store

#### `nuxt-typed-vuex`

Vuex does not provide useful types for accessing the store from your app. `this.$store` remains untyped in a Nuxt app.

There is a new project, [`nuxt-typed-vuex`](https://github.com/danielroe/nuxt-typed-vuex) - and [guide](https://nuxt-typed-vuex.danielcroe.com/) - which aims to remedy that - providing a strongly-typed accessor for a vanilla Nuxt store.

#### Bring your own

Alternatively, you can provide your own types at the point of use.

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
