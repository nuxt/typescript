# Components

:::: tabs

::: tab "Object API"
```html
<template>
  <div>
    Name: {{ fullName }}
    Message: {{ message }}
  </div>
</template>

<script lang="ts">
```
```ts
import Vue, { PropOptions } from 'vue'

interface User {
  firstName: string
  lastName: number
}

export default Vue.extend({
  name: 'YourComponent',

  props: {
    user: {
      type: Object,
      required: true
    } as PropOptions<User>,
  },

  data () {
    return {
      message: 'This is a message'
    }
  }

  computed: {
    fullName (): string {
      return `${this.user.firstName} ${this.user.lastName}` 
    }
  }
})
```
```html
</script>
```
:::

::: tab "Class API"
```html
<template>
  <div>
    Name: {{ fullName }}
    Message: {{ message }}
  </div>
</template>

<script lang="ts">
```
```ts
import { Vue, Component, Prop } from 'vue-property-decorator'

interface User {
  firstName: string
  lastName: number
}

@Component
export default class YourComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly user!: User

  message: string = 'This is a message'

  get fullName (): string {
    return `${this.user.firstName} ${this.user.lastName}` 
  }
}
```
```html
</script>
```

::: tip
Resources :
- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
:::

::: tab "Function API"
```html
<template>
  <div>
    Name: {{ fullName }}
    Message: {{ message }}
  </div>
</template>

<script lang="ts">
```
```ts
import Vue from 'vue'
import { computed } from 'vue-function-api'

interface User {
  firstName: string
  lastName: number
}

interface YourProps {
  user?: User
}

export default Vue.extend({
  name: 'YourComponent',
  
  setup ({ user }: YourProps) {
    const fullName = computed(() => `${user.firstName} ${user.lastName}`)
    const message = value('This is a message')

    return {
      fullName,
      message
    }
  }
})
```
```html
</script>
```
::: tip
Resources :
- [vue-function-api](https://github.com/vuejs/vue-function-api)
:::

