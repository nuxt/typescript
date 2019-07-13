import Vue from 'vue'

export default Vue.extend({
  name: 'Contact',
  data () {
    const text: string = 'Contact Page'
    return { text }
  },
  render () {
    return <div>{ this.text }</div>
  }
})
