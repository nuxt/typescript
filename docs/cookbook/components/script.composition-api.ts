import { createComponent, computed, reactive, PropType } from '@vue/composition-api'

interface User {
  firstName: string
  lastName: number
}

export default createComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  } as const,

  setup ({ user }) {
    const fullName = computed(() => `${user.firstName} ${user.lastName}`)
    const message = reactive('This is a message')

    return {
      fullName,
      message
    }
  }
})
