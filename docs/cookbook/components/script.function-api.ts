import { createComponent, computed, value } from 'vue-function-api'

interface User {
  firstName: string
  lastName: number
}

interface YourProps {
  user?: User
}

export default createComponent({
  props: {
    user: {},
  },

  setup ({ user }: YourProps) {
    const fullName = computed(() => `${user.firstName} ${user.lastName}`)
    const message = value('This is a message')

    return {
      fullName,
      message
    }
  }
})
