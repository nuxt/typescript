import path from 'path'

import theme from '@nuxt/content-theme-docs'

export default theme({
  css: [path.resolve(__dirname, './assets/custom.css')],
  plugins: [path.resolve(__dirname, './plugins/vue-tabs.js')],
  generate: {
    routes: ['/']
  }
})
