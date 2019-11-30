import { Module } from '@nuxt/types'

const a: number = 5

const localModule: Module = () => {
  // eslint-disable-next-line
  console.log(a)
}

export default localModule
