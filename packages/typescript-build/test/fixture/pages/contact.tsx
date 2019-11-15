import Vue from 'vue'

export default Vue.extend({
  name: 'Contact',
  data() {
    const text = 'Contact Page'
    return { text }
  },
  render() {
    return <div>{this.text}</div>
  },
})
