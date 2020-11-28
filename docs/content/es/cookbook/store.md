---
title: Store
position: 25
description: 'Soporte de Typescript para Nuxt.js'
category: 'Cookbook'
---

Existen varias formas diferentes de escribir y acceder al store en un proyecto de Nuxt usando Typescript.

## Class-based

### `vuex-module-decorators`

Uno de los enfoques más popular es [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) - ver la [guía](https://championswimmer.in/vuex-module-decorators/).


Para usar con Nuxt, existen pocos puntos claves:

1. Tus modulos deben ser decorados con `stateFactory: true`, por ejemplo:

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

2. Si usted quiere acceder al store sin iniciarlo en cada componente, usted debe crear un [plugin inicializador](https://github.com/championswimmer/vuex-module-decorators#accessing-modules-with-nuxtjs), por ejemplo:
   ```ts{}[store/index.ts]
   import { Store } from 'vuex'
   import { initialiseStores } from '~/utils/store-accessor'

   const initializer = (store: Store<any>) => initialiseStores(store)

   export const plugins = [initializer]
   export * from '~/utils/store-accessor'
   ```

3. Si usted quiere acceder a la instancia app de Nuxt, usted debe hacer algo similar con un plugin, por ejemplo:
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

[`vuex-class-component`](https://github.com/michaelolof/vuex-class-component) es un enfoque basado en clases muy prometedor para el store de Nuxt, y la sintaxis es muy similar a `vuex-module-decorators`.Acaba de lanzar una nueva API, aunque todavía no es totalmente compatible con Nuxt. La solución alternativa es definir módulos con un decorador:

```ts
@Module({ namespacedPath: 'foo' })
export default class extends VuexModule {}
```

Ver [este reporte](https://github.com/michaelolof/vuex-class-component/issues/43) para visualizar el estado actual de los problemas de compatibilidad con Nuxt.

## Vanilla

### Basico

Vuex suministra tipos muy básicos para usar con la tienda. Puede usarlos para ayudar a definir su store. Por ejemplo:

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

Usted deberia hacer exactamente lo mismo para un modulo. Por ejemplo:

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

### Accediendo al store

#### `nuxt-typed-vuex`

Vuex no provee tipos utiles para acceder al store desde tu app. `this.$store` todavia esta sin tipos en una app de Nuxt.

Aqui esta un nuevo proyecto, [`nuxt-typed-vuex`](https://github.com/danielroe/nuxt-typed-vuex) - y una [guia](https://nuxt-typed-vuex.danielcroe.com/) - que tiene como objetivo remediar eso: proporcionar un acceso fuertemente tipado para un store de Nuxt.

#### Hazlo a tu manera

Alternativamente, usted puede proveer sus propios tipos como un punto de uso.

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
