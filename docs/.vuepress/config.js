const fs = require('fs-extra')

module.exports = {
  title: 'Nuxt TypeScript',
  description: 'TypeScript Support for Nuxt',
  themeConfig: {
    repo: 'nuxt/typescript',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    sidebar: {
      '/examples': getExamplesSidebar(),
      '/': getMainSidebar()
    },
    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'Examples',
        link: '/examples/object-api/minimal'
      }
    ]
  }
}

function getMainSidebar () {
  return [
    {
      title: 'Guide',
      collapsable: false,
      children: [
        '/guide/',
        '/guide/setup',
        '/guide/runtime',
        '/guide/lint'
      ]
    },
    {
      title: 'Cookbook',
      collapsable: false,
      children: [
        '/cookbook/components',
        '/cookbook/middlewares',
        '/cookbook/plugins',
        '/cookbook/configuration',
        '/cookbook/modules',
        '/cookbook/server-middlewares'
      ]
    },
    '/migration'
  ]
}

function getExamplesSidebar () {
  const apiNames = ['object', 'class', 'function']
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
