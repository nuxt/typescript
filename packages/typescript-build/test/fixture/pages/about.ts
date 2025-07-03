import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About',
  render (h) {
    const text: string = 'About Page'
    return h('div', text)
  }
})
