module.exports = {
  title: 'TypeScript Module',
  description: 'TypeScript Support Module for Nuxt',
  themeConfig: {
    repo: 'nuxt/typescript',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    displayAllHeaders: true,
    sidebar: {
      '/guide': getGuideSidebar(),
      '/examples': getExamplesSidebar()
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

function getGuideSidebar() {
  return ['']
}

function getExamplesSidebar () {
  const apiNames = ['object', 'class', 'function']
  const exampleNames = ['minimal', 'basic', 'advanced']

  return apiNames.map(apiName =>
    ({
      title: `${apiName[0].toUpperCase() + apiName.slice(1)} API`,
      path: `/examples/${apiName}-api/minimal`,
      collapsable: false,
      children: exampleNames.map(exampleName => ([`examples/${apiName}-api/${exampleName}`, exampleName[0].toUpperCase() + exampleName.slice(1)]))
    })
  )
}
