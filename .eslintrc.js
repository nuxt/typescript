module.exports = {
  extends: [
    '@nuxtjs'
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
