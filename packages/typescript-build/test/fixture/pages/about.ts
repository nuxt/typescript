import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About',
  render (h) {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const text: string = 'About Page'
    return h('div', text)
  }
})
