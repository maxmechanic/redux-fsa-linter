import { isFSA } from 'flux-standard-action'
import isPlainObject from 'lodash.isplainobject'

const noopIgnore = () => false
const defaultArgs = { ignore: noopIgnore, strict: false }

export function createFSALinter ({ strict = false, ignore = noopIgnore } = defaultArgs) {
  return function standardActionLinter () {
    return next => action => {
      const isUnignoredPOJO = isPlainObject(action) && !ignore(action)

      if (isUnignoredPOJO && !isFSA(action)) {
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
