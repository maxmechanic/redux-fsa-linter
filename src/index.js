import { isFSA } from 'flux-standard-action'
import isPlainObject from 'lodash.isplainobject'

export function createFSALinter (strict) {
  return function standardActionLinter () {
    return next => action => {
      if (isPlainObject(action) && !isFSA(action)) {
        if (strict) {
          throw new Error(`Action is not FSA-compliant: ${JSON.stringify(action)}`)
        } else {
          console.warn('Action is not FSA-compliant:', action)
        }
      }
      next(action)
    }
  }
}

export default createFSALinter
