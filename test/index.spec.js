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
    createFSALinter(false)()(next)(action)

    assert(console.warn.calledOnce)
  })

  it('should not try to lint non-objects', () => {
    const action = noop
    createFSALinter(false)()(next)(action)

    assert(console.warn.notCalled)
  })

  it('should not warn on FSA-compliant actions', () => {
    const action = { type: 'ACTION', payload: 9 }
    createFSALinter(false)()(next)(action)

    assert(console.warn.notCalled)
  })

  it('throw an error on lint failure if strict mode is enabled', () => {
    const action = { type: 'ACTION', value: 9 }
    assert.throws(
      () => createFSALinter(true)()(next)(action)
    )
  })
})
