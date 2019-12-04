import { Vue, Component, Prop } from 'vue-property-decorator'

interface User {
  firstName: string
  lastName: number
}

@Component
export default class YourComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly user!: User

  message: string = 'Esta é uma mensagem'

  get fullName (): string {
    return `${this.user.firstName} ${this.user.lastName}`
  }
}
