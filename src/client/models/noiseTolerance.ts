import { hasOwnProperty, isArray, isNull, isObject, isString } from '../utils'

export interface NoiseTolerance {
  statementsScores: string[]
}

export const isValidNoiseTolerance = (
  noiseTolerance: unknown
): noiseTolerance is NoiseTolerance =>
  isNull(noiseTolerance) ||
  (isObject(noiseTolerance) &&
    hasOwnProperty(noiseTolerance, 'statementsScores') &&
    isArray(noiseTolerance.statementsScores))
