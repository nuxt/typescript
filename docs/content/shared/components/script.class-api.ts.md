```ts
import { Vue, Component, Prop } from 'vue-property-decorator'

interface User {
  firstName: string
  lastName: string
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
