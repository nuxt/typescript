import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Contact',
  data () {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const text: string = 'Contact Page'
    return { text }
  },
  render () {
    return <div>{ this.text }</div>
  }
})
