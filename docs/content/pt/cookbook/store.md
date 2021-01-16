---
title: Store
position: 25
description: 'Suporte de TypeScript para Nuxt.js'
category: 'Cookbook'
---

Existem várias opções diferentes para escrever e acessar o store em um projeto Nuxt usando o TypeScript.

## Baseado em classe

### `vuex-module-decorators`

Uma das abordagens mais populares é o [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) - veja o [guia](https://championswimmer.in/vuex-module-decorators/).


Para uso com o Nuxt, existem poucas condições principais:

1. Seus módulos devem ser decorados com `stateFactory: true`, por exemplo:

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

2. Se você quiser acessar o store sem inicializá-lo em cada componente, poderá fazê-lo usando um [plugin inicializador](https://github.com/championswimmer/vuex-module-decorators#accessing-modules-with-nuxtjs), por exemplo:
   ```ts{}[store/index.ts]
   import { Store } from 'vuex'
   import { initialiseStores } from '~/utils/store-accessor'

   const initializer = (store: Store<any>) => initialiseStores(store)

   export const plugins = [initializer]
   export * from '~/utils/store-accessor'
   ```

3. Se você deseja acessar a instância do aplicativo Nuxt, precisará fazer algo semelhante com um plug-in, por exemplo:
   ```ts{}[plugins/axios-accessor.ts]
   import { Plugin } from '@nuxt/types'
   import { initializeAxios } from '~/utils/api'

   const accessor: Plugin = ({ $axios }) => {
     initializeAxios($axios)
   }

   export default accessor
   ```

   Não se esqueça de adicionar o plugin para seu arquivo `nuxt.config.js`.

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

[`vuex-class-component`](https://github.com/michaelolof/vuex-class-component) é uma abordagem baseada em classe muito promissora para o Nuxt store, e a sintaxe é muito semelhante ao `vuex-module-decorators`. Ele acaba de lançar uma nova API, embora ainda não seja compatível totalmente com o Nuxt. A solução alternativa é definir módulos com um decorador:

```ts
@Module({ namespacedPath: 'foo' })
export default class extends VuexModule {}
```

Consulte [esse  issue](https://github.com/michaelolof/vuex-class-component/issues/43) para obter o status atual do problema de compatibilidade com o Nuxt.

## Vanilla

### Tipagem básica

O Vuex fornece tipos muito básicos para uso no store. Você pode usá-los para ajudar a definir seu store. Por exemplo:

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
    commit('CHANGE_NAME', 'Novo nome')
  },
}
```

Você faria exatamente o mesmo para um módulo. Por exemplo:

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

### Acessando o store

#### `nuxt-typed-vuex`


O Vuex não fornece tipos úteis para acessar a store a partir da sua aplicação. `this.$store` permanece sem tipo em um aplicação Nuxt.

Há um novo projeto, o [`nuxt-typed-vuex`](https://github.com/danielroe/nuxt-typed-vuex) - e o [guia](https://nuxt-typed-vuex.danielcroe.com/) - que visa remediar isso - fornecendo um acessador fortemente tipado para uma store do Nuxt vanilla.


#### Traga o seu próprio

Alternativamente, você pode fornecer seus próprios tipos no ponto de uso.

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
