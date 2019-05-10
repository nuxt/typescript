module.exports = {
  testEnvironment: 'node',

  expand: true,

  forceExit: true,

  setupFilesAfterEnv: ['./test/utils/setup'],

  coverageDirectory: './coverage',

  collectCoverageFrom: [
    '**/packages/*/src/**/*.js'
  ],

  transformIgnorePatterns: [
    'node_modules/(?!(@nuxt|nuxt))'
  ],

  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  },

  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ]
}
#!/usr/bin/env node
