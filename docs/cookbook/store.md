# Store

There are a number of different options for writing and accessing the store in a Nuxt project using TypeScript.

## Class-based

### `vuex-module-decorators`

One of the most popular approaches is [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) - see [guide](https://championswimmer.in/vuex-module-decorators/).

::: warning
There is currently a very serious security issue with `nuxt-module-decorators`: there is cross-request state pollution - so you will need to make sure that there is no request-specific information in the SSR store. See [this PR](https://github.com/championswimmer/vuex-module-decorators/pull/157) for the current status of the fix.
:::

For use with Nuxt, there are few key provisos:

1. Your modules must be decorated with `stateFactory: true`, so for example:

   `~/store/mymodule.ts`:

   ```ts
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
   `~/store/index.ts`:

   ```ts
   import { Store } from 'vuex'
   import { initialiseStores } from '~/utils/store-accessor'

   const initializer = (store: Store<any>) => initialiseStores(store)

   export const plugins = [initializer]
   export * from '~/utils/store-accessor'
   ```

3. If you want to access the Nuxt app instance, you will need to do something similar with a plugin, for example:
   `~/plugins/axios-accessor.ts`:

   ```ts
   import { Plugin } from '@nuxt/types'
   import { initializeAxios } from '~/utils/api'

   const accessor: Plugin = ({ $axios }) => {
     initializeAxios($axios)
   }

   export default accessor
   ```

   `~/utils/api.ts`:

   ```ts
   import { NuxtAxiosInstance } from '@nuxtjs/axios'

   let $axios: NuxtAxiosInstance

   export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
     $axios = axiosInstance
   }
   
   export { $axios }
   ```

   `~/store/users.ts`:

   ```ts
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

[`vuex-class-component`](https://github.com/michaelolof/vuex-class-component) is a very promising class-based approach to the Nuxt store, and the syntax is very similar to `vuex-module-decorators`. It has just released a new API, although it is not yet compatible in its entirety with Nuxt. The workaround is to define modules with a decorator:

```ts
@Module({ namespacedPath: 'foo' })
export default class extends VuexModule {}
```

See [this issue](https://github.com/michaelolof/vuex-class-component/issues/43) for the current status of the compatibility issue with Nuxt.

## Vanilla

### Basic typing

Vuex supplies very basic types for use with the store. You can use these to help define your store. For example:

`~/store/index.ts`:

```ts
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

### Accessing the store

#### `nuxt-typed-vuex`

Vuex does not provide useful types for accessing the store from your app. `this.$store` remains untyped in a Nuxt app.

There is a new project, [`nuxt-typed-vuex`](https://github.com/danielroe/nuxt-typed-vuex) - and [guide](https://nuxt-typed-vuex.danielcroe.com/) - which aims to remedy that - providing a strongly-typed accessor for a vanilla Nuxt store.

#### Bring your own

Alternatively, you can provide your own types at the point of use.

`~/components/MyComponent.vue`:

```ts
<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import { RootState } from '~/store'

@Component
export default class MyComponent extends Vue {
    get myThings() {
        return (this.$store.state as RootState).things
    }
}
```
