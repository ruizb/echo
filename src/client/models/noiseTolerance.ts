import { hasOwnProperty, isArray, isNull, isObject, isString } from '../utils'

export interface NoiseTolerance {
  statementsScores: string[]
  soundsDislike: string
}

export const isValidNoiseTolerance = (
  noiseTolerance: unknown
): noiseTolerance is NoiseTolerance =>
  isNull(noiseTolerance) ||
  (isObject(noiseTolerance) &&
    hasOwnProperty(noiseTolerance, 'statementsScores') &&
    isArray(noiseTolerance.statementsScores) &&
    hasOwnProperty(noiseTolerance, 'soundsDislike') &&
    isString(noiseTolerance.soundsDislike))
