import path from 'path'

import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#6badff'
  },
  css: [path.resolve(__dirname, './assets/custom.css')],
  plugins: [path.resolve(__dirname, './plugins/vue-tabs.js')],
  generate: {
    routes: ['/', '/es', 'ja', 'pt', 'zh-Hant', 'zh-Hans']
  },
  i18n: {
    locales: () => [
      { iso: 'en-US', code: 'en', name: 'English', file: 'en-US.js' },
      { iso: 'ja-JP', code: 'ja', name: '日本語', file: 'ja_JP.js' },
      { iso: 'es-ES', code: 'es', name: 'Español', file: 'es-ES.js' },
      { iso: 'pt', code: 'pt', name: 'Português' },
      { iso: 'zh-Hant', code: 'zh-Hant', name: '繁體中文', file: 'zh-CN.js' },
      { iso: 'zh-Hans', code: 'zh-Hans', name: '简体中文', file: 'zh-CN.js' }
    ],
    defaultLocale: 'en',
    vueI18n: {
      messages: {
        pt: {
          search: {
            placeholder: 'Pesquisar os docs (Pressione "/" para o foco)'
          },
          toc: {
            title: 'Nesta página'
          },
          article: {
            github: 'Edite esta página no GitHub'
          }
        }
      }
    }
  }
})
