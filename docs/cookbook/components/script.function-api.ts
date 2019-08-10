import Vue from 'vue'
import { computed, value } from 'vue-function-api'

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
