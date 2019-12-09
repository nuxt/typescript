import { createComponent, computed, ref } from '@vue/composition-api'

interface User {
  firstName: string
  lastName: number
}

export default createComponent({
  props: {
    user: {
      type: Object as () => User,
      required: true
    }
  },

  setup ({ user }) {
    const fullName = computed(() => `${user.firstName} ${user.lastName}`)
    const message = ref('This is a message')

    return {
      fullName,
      message
    }
  }
})
