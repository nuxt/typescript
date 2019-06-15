import { resolveNuxtBin } from '..'

test('resolveNuxtBin', () => {
  expect(resolveNuxtBin()).toEqual(require.resolve('nuxt-edge/bin/nuxt.js'))
})
