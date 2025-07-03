import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Contact',
  data () {
    const text: string = 'Contact Page'
    return { text }
  },
  render () {
    return <div>{ this.text }</div>
  }
})
