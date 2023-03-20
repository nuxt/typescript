```ts
import { defineComponent, PropType } from 'vue'

interface User {
  firstName: string
  lastName: string
}

export default defineComponent({
  name: 'YourComponent',

  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },

  data () {
    return {
      message: 'This is a message'
    }
  },

  computed: {
    fullName (): string {
      return `${this.user.firstName} ${this.user.lastName}`
    }
  }
})
```
