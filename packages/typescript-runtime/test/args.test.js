import { resolve } from 'path'
import { getRootdirFromArgv } from '..'

jest.mock('@nuxt/cli-edge', () => ({
  options: {
    ...jest.requireActual('@nuxt/cli-edge').options,
    custom: {
      withoutAlias: {
        type: 'string'
      }
    }
  }
}))

const argv = process.argv

describe('getRootdirFromArgv', () => {
  let setupArgs

  beforeEach(() => {
    setupArgs = (commandLine) => { process.argv = [...argv, ...commandLine.split(' ')] }
  })

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
  test('nuxt-ts dev --withoutAlias test project', () => {
    setupArgs('dev --withoutAlias test project')
    expect(getRootdirFromArgv()).toEqual(resolve(process.cwd(), 'project'))
  })
})
