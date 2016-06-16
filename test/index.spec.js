/* global describe beforeEach afterEach it */

import assert from 'assert'
import { createFSALinter } from '../src/index'
import { stub } from 'sinon'

const noop = () => {}
const next = noop

describe('createFSALinter()', () => {
  beforeEach(() => {
    stub(console, 'warn')
  })

  afterEach(() => {
    console.warn.restore()
  })

  it('should console.warn on a non-FSA action', () => {
    const action = { type: 'ACTION', value: 9 }
    createFSALinter({ strict: false })()(next)(action)

    assert(console.warn.calledOnce)
  })

  it('should not try to lint non-objects', () => {
    const action = noop
    createFSALinter({ strict: false })()(next)(action)

    assert(console.warn.notCalled)
  })

  it('should not warn on FSA-compliant actions', () => {
    const action = { type: 'ACTION', payload: 9 }
    createFSALinter({ strict: false })()(next)(action)

    assert(console.warn.notCalled)
  })

  it('throw an error on lint failure if strict mode is enabled', () => {
    const action = { type: 'ACTION', value: 9 }
    assert.throws(
      () => createFSALinter({ strict: true })()(next)(action)
    )
  })

  it('ignores actions based on a predicate', () => {
    const action = { type: 'ACTION', value: 9 }
    const ignoredAction = { type: 'NOPE', value: 1 }

    const ignore = ({ type }) => type === 'NOPE'

    const linter = createFSALinter({ ignore })()(next)
    linter(action)
    linter(ignoredAction)

    assert(console.warn.calledOnce)
  })

  it('defaults to strict: false and a noop ignore', () => {
    const action = { type: 'ACTION', value: 9 }
    createFSALinter()()(next)(action)

    assert(console.warn.calledOnce)
  })
})
