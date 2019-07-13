import Vue from 'vue'

export default Vue.extend({
  name: 'About',
  render (h) {
    const text: string = 'About Page'
    return h('div', text)
  }
})
