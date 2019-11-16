# Store

Hay un numero de diferentes opciones pata escribir y acceder al _"store"_ en un proyecto de Nuxt usando TypeScript.

## Basado en Clases

### `vuex-module-decorators`

Uno de los enfoques mas populares es usando [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) - mira la [guía](https://championswimmer.in/vuex-module-decorators/).

::: warning
Actualmente, hay un problema muy serio de seguriar con `nuxt-module-decorators`: hay un "cross-request state pollution" - asi que necesitarás asegurarte de que no hay información específica de la solicitud en el _"store"_ en _"SSR"_. Mira [este _"PR"_](https://github.com/championswimmer/vuex-module-decorators/pull/157) para ver el estatus actual del _"fix"_.
:::

Para el uso con Nuxt, hay pocas condiciones clave:

1. Tus módulos deben ser decorados con `stateFactory: true`, por ejemplo:

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

2. Si quieres acceder al _"store"_ sin inicializarlo en cada componente, puedes hacerlo utilizando un [plugin inicializador](https://github.com/championswimmer/vuex-module-decorators#accessing-modules-with-nuxtjs), por ejemplo:
   `~/store/index.ts`:

   ```ts
   import { Store } from 'vuex'
   import { initialiseStores } from '~/utils/store-accessor'

   const initializer = (store: Store<any>) => initialiseStores(store)

   export const plugins = [initializer]
   export * from '~/utils/store-accessor'
   ```

3. Si quieres acceder a la instancia de app de Nuxt, necesitarás hacer algo similar a un plugin, por ejemplo:
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

[`vuex-class-component`](https://github.com/michaelolof/vuex-class-component) es un enfoque prometedor basado en clases para el _"store"_ de Nuxt, y la sintaxis es muy similar a `vuex-module-decorators`. Acaba de lanzar una nueva API, aunque todavía no es totalmente compatible con Nuxt. La solución alternativa es definir módulos con un decorador:

```ts
@Module({ namespacedPath: 'foo' })
export default class extends VuexModule {}
```

Ve [este _"issue"_](https://github.com/michaelolof/vuex-class-component/issues/43) para el estado actual del problema de compatibilidad con Nuxt.

## Vainilla

### Tipado Clásico

Vuex suministra tipos muy básicos para usarse con el _"store"_. Puede usarlos para  definir tu _"store"_. Por ejemplo:

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

### Accediendo al "store"

#### `nuxt-typed-vuex`

Vuex no proporciona tipos útiles para acceder al _"store"_ desde la aplicación. `this.$store` permanece sin tipo en una aplicación de Nuxt.

Hay un nuevo proyecto, [`nuxt-typed-vuex`](https://github.com/danielroe/nuxt-typed-vuex) - y una [guía](https://nuxt-typed-vuex.danielcroe.com/) - que tiene como objetivo remediar eso, proporcionando un acceso fuertemente tipado para un _"store"_ vainilla de Nuxt.

#### Trae el tuyo

Alternativamente, puede proporcionar tus propios tipos en el punto de uso.

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
