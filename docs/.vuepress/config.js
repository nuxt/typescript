const fs = require('fs-extra')

module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Nuxt TypeScript',
      description: 'TypeScript Support for Nuxt.js'
    },
    '/ja/': {
      lang: 'ja-JP',
      title: 'Nuxt TypeScript',
      description: 'Nuxt.js 向け TypeScript サポート'
    },
    '/es/': {
      lang: 'es-ES',
      title: 'Nuxt TypeScript',
      description: 'Soporte de Typescript para Nuxt.js'
    },
    '/pt/': {
      lang: 'pt',
      title: 'Nuxt TypeScript',
      description: 'Suporte de Typescript para Nuxt.js'
    }
  },
  plugins: [
    ['autometa', {
      canonical_base: 'https://typescript.nuxtjs.org'
    }],
    'tabs'
  ],
  head: [
    ['meta', { property: 'og:image', content:'https://typescript.nuxtjs.org/assets/logo.png' }],
    ['meta', { name: 'twitter:image', content:'https://typescript.nuxtjs.org/assets/logo.png' }]
  ],
  themeConfig: {
    repo: 'nuxt/typescript',
    docsDir: 'docs',
    editLinks: true,
    lastUpdated: 'Last Updated',
    logo: '/assets/logo.svg',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        sidebar: {
          '/examples': getExamplesSidebar(),
          '/': getMainSidebar('', 'Guide', 'Cookbook')
        },
        nav: [
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'Examples',
            link: '/examples/options-api/minimal'
          }
        ]
      },
      '/ja/': {
        label: '日本語',
        selectText: '言語',
        editLinkText: 'このページを GitHub で編集する',
        sidebar: {
          '/examples': getExamplesSidebar(),
          '/ja/': getMainSidebar('/ja', 'Guide', 'Cookbook')
        },
        nav: [
          {
            text: 'ガイド',
            link: '/ja/guide/'
          },
          {
            text: '例',
            link: '/examples/options-api/minimal'
          }
        ]
      },
      '/es/': {
        label: 'Español',
        selectText: 'Idiomas',
        editLinkText: 'Edita esta pagina en GitHub',
        sidebar: {
          '/examples': getExamplesSidebar(),
          '/es/': getMainSidebar('/es', 'Guía', 'Cookbook')
        },
        nav: [
          {
            text: 'Guía',
            link: '/es/guide/'
          },
          {
            text: 'Ejemplos',
            link: '/examples/options-api/minimal'
          }
        ]
      },
      '/pt/': {
        label: 'Portuguese',
        selectText: 'Línguas',
        editLinkText: 'Edite esta página no GitHub',
        sidebar: {
          '/examples': getExamplesSidebar(),
          '/pt/': getMainSidebar('/pt', 'Guia', 'Cookbook')
        },
        nav: [
          {
            text: 'Guia',
            link: '/pt/guide/'
          },
          {
            text: 'Exemplos',
            link: '/examples/options-api/minimal'
          }
        ]
      }
    }
  }
}

function getMainSidebar (prefix, guide, cookbook) {
  return [
    {
      title: guide,
      collapsable: false,
      children: [
        prefix + '/guide/',
        prefix + '/guide/setup',
        prefix + '/guide/runtime',
        prefix + '/guide/lint'
      ]
    },
    {
      title: cookbook,
      collapsable: false,
      children: [
        prefix + '/cookbook/components/',
        prefix + '/cookbook/middlewares',
        prefix + '/cookbook/plugins',
        prefix + '/cookbook/store',
        prefix + '/cookbook/configuration',
        prefix + '/cookbook/modules',
        prefix + '/cookbook/server-middlewares'
      ]
    },
    prefix + '/migration'
  ]
}

function getExamplesSidebar () {
  const apiNames = ['options', 'class', 'composition']
  const levels = ['minimal', 'basic', 'advanced']

  return apiNames.map((apiName) => {
    return {
      title: `${apiName[0].toUpperCase() + apiName.slice(1)} API`,
      collapsable: false,
      children: levels.map((level, index) => {
        const hasGenerated = generateExampleMarkdown(apiName, level, index === 0 ? { prev: false } : index === levels.length - 1 ? { next: false } : {})
        const title = level[0].toUpperCase() + level.slice(1)
        return [`/examples/${apiName}-api/${level}`, hasGenerated ? title : `${title} (soon)`]
      })
    }
  })
}

function generateExampleMarkdown (apiName, level, options = {}) {
  const exampleExists = fs.existsSync(`../examples/${apiName}-api/${level}`)
  let content = ''

  if (Object.keys(options).length > 0) {
    content += '---\n'
    for (const [key, value] of Object.entries(options)) {
      content += `${key}: ${value}\n`
    }
    content += '---\n\n'
  }

  content += `# ${apiName[0].toUpperCase()}${apiName.slice(1)} API example (${level})\n\n`

  if (!exampleExists) {
    content += '### Coming Soon ...\n\n'
    content += `<!-- <Example name="${apiName}-api/${level}" /> -->\n`
  } else {
    content += `<Example name="${apiName}-api/${level}" />\n`
  }

  fs.outputFileSync(`./examples/${apiName}-api/${level}.md`, content)

  return exampleExists
}
