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
  },

  setup ({ user }) {
    const fullName = computed(() => `${user.firstName} ${user.lastName}`)
    const message = reactive('Esta é uma mensagem')

    return {
      fullName,
      message
    }
  }
})
