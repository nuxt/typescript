module.exports = {
  title: 'TypeScript Module',
  description: 'TypeScript Support Module for Nuxt',
  themeConfig: {
    repo: 'nuxt/typescript',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    displayAllHeaders: true,
    sidebar: [
      {
        collapsable: false,
        children: [
          '/guide/'
        ]
      }
    ],
    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      }
    ]
  }
}
