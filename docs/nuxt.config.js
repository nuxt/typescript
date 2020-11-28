import path from 'path'

import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#007ACC'
  },
  css: [path.resolve(__dirname, './assets/custom.css')],
  plugins: [path.resolve(__dirname, './plugins/vue-tabs.js')],
  generate: {
    routes: ['/']
  },
  i18n: {
    locales: () => [
      { iso: 'en-US', code: 'en', name: 'English' },
      { iso: 'ja-JP', code: 'ja', name: '日本語' },
      { iso: 'es-ES', code: 'es', name: 'Español' },
      { iso: 'pt', code: 'pt', name: 'Portuguese' },
      { iso: 'zh-Hant', code: 'zh-Hant', name: '繁體中文' },
      { iso: 'zh-Hans', code: 'zh-Hans', name: '简体中文' }
    ],
    defaultLocale: 'en'
  }
})
