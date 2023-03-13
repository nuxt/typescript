import Vue from 'vue'

export default Vue.extend({
  name: 'About',
  render (h) {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const text: string = 'About Page'
    return h('div', text)
  }
})
