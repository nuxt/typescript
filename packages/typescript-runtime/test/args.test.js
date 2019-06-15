import { resolve } from 'path'
import { getRootdirFromArgv } from '..'

const setupArgs = commandLine => process.argv.push(...commandLine.split(' '))

describe('getRootdirFromArgv', () => {
  test('nuxt-ts', () => {
    expect(getRootdirFromArgv()).toEqual(process.cwd())
  })
  test('nuxt-ts project', () => {
    setupArgs('project')
    expect(getRootdirFromArgv()).toEqual(resolve(process.cwd(), 'project'))
  })
  test('nuxt-ts dev project', () => {
    setupArgs('dev project')
    expect(getRootdirFromArgv()).toEqual(resolve(process.cwd(), 'project'))
  })
  test('nuxt-ts dev -p 3001 project', () => {
    setupArgs('dev -p 30001 project')
    expect(getRootdirFromArgv()).toEqual(resolve(process.cwd(), 'project'))
  })
  test('nuxt-ts dev -p 3001 --analyze project', () => {
    setupArgs('dev -p 30001 --analyze project')
    expect(getRootdirFromArgv()).toEqual(resolve(process.cwd(), 'project'))
  })
})
