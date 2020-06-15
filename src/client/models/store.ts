import {
  hasOwnProperty,
  isArray,
  isBoolean,
  isNumber,
  isObject,
  isString,
  isNull
} from '../utils'
import { NoiseTolerance } from './noiseTolerance'
import { Part } from './part'
import { SoundTest, WithNameAndScore } from './soundTest'
import { isValidDevice, UserInfo } from './userInfo'

export interface Store {
  partInProgress: Part
  userInfo: null | UserInfo
  noiseTolerance: null | NoiseTolerance
  soundVolume: number
  soundTests: WithNameAndScore[]
  remainingSoundTests: WithNameAndScore[]
  dataSent: boolean
}

export const initialStore: Store = {
  partInProgress: Part.Introduction,
  userInfo: null,
  noiseTolerance: null,
  soundVolume: 0.1,
  soundTests: [],
  remainingSoundTests: [],
  dataSent: false
}

const isValidPartInProgress = (
  partInProgress: unknown
): partInProgress is Part => isString(partInProgress)

const isValidSoundVolume = (soundVolume: unknown): soundVolume is number =>
  isNumber(soundVolume)

const isValidSoundTests = (soundTests: unknown): soundTests is SoundTest[] =>
  isArray(soundTests)

const isValidUserInfo = (userInfo: unknown): userInfo is UserInfo =>
  isNull(userInfo) ||
  (isObject(userInfo) &&
    hasOwnProperty(userInfo, 'age') &&
    isNumber(userInfo.age) &&
    hasOwnProperty(userInfo, 'device') &&
    isValidDevice(userInfo.device) &&
    hasOwnProperty(userInfo, 'hearingIssues') &&
    isBoolean(userInfo.hearingIssues) &&
    hasOwnProperty(userInfo, 'tinnitus') &&
    isBoolean(userInfo.tinnitus) &&
    hasOwnProperty(userInfo, 'hearingHypersensibility') &&
    isBoolean(userInfo.hearingHypersensibility) &&
    hasOwnProperty(userInfo, 'soundsReactions') &&
    isBoolean(userInfo.soundsReactions) &&
    (userInfo.soundsReactions
      ? hasOwnProperty(userInfo, 'soundsList') && isArray(userInfo.soundsList)
      : true))

const isValidNoiseTolerance = (
  noiseTolerance: unknown
): noiseTolerance is NoiseTolerance =>
  isNull(noiseTolerance) ||
  (isObject(noiseTolerance) &&
    hasOwnProperty(noiseTolerance, 'statementsScores') &&
    isArray(noiseTolerance.statementsScores) &&
    hasOwnProperty(noiseTolerance, 'soundsDislike') &&
    isString(noiseTolerance.soundsDislike))

/**
 * Load store from local storage
 */
export const loadStore = (): Store => {
  const store = localStorage.getItem('store')
  if (!isString(store)) {
    return initialStore
  }
  try {
    const parsedStore: object = JSON.parse(store)
    if (
      hasOwnProperty(parsedStore, 'partInProgress') &&
      isValidPartInProgress(parsedStore.partInProgress)
    ) {
      if (
        hasOwnProperty(parsedStore, 'soundVolume') &&
        isValidSoundVolume(parsedStore.soundVolume)
      ) {
        if (
          hasOwnProperty(parsedStore, 'soundTests') &&
          isValidSoundTests(parsedStore.soundTests)
        ) {
          if (
            hasOwnProperty(parsedStore, 'userInfo') &&
            isValidUserInfo(parsedStore.userInfo)
          ) {
            if (
              hasOwnProperty(parsedStore, 'noiseTolerance') &&
              isValidNoiseTolerance(parsedStore.noiseTolerance)
            ) {
              if (
                hasOwnProperty(parsedStore, 'remainingSoundTests') &&
                isArray<SoundTest>(parsedStore.remainingSoundTests)
              ) {
                if (
                  hasOwnProperty(parsedStore, 'dataSent') &&
                  isBoolean(parsedStore.dataSent)
                ) {
                  return {
                    partInProgress: parsedStore.partInProgress,
                    userInfo: parsedStore.userInfo,
                    noiseTolerance: parsedStore.noiseTolerance,
                    soundVolume: parsedStore.soundVolume,
                    soundTests: parsedStore.soundTests,
                    remainingSoundTests: parsedStore.remainingSoundTests,
                    dataSent: parsedStore.dataSent
                  }
                } else {
                  throw new Error(`Invalid parsedStore.dataSent`)
                }
              } else {
                throw new Error(`Invalid parsedStore.experiment`)
              }
            } else {
              throw new Error(`Invalid parsedStore.noiseTolerance`)
            }
          } else {
            throw new Error(`Invalid parsedStore.userInfo`)
          }
        } else {
          throw new Error(`Invalid parsedStore.soundTests`)
        }
      } else {
        throw new Error(`Invalid parsedStore.soundVolume`)
      }
    } else {
      throw new Error(`Invalid parsedStore.partInProgress`)
    }
  } catch (err) {
    console.error('Invalid store object', err, store)
    localStorage.removeItem('store')
    return initialStore
  }
}

/**
 * Save store in the local storage
 */
export const saveStore = (store: Store): void => {
  localStorage.setItem('store', JSON.stringify(store))
}

// @internal
let store: Store = loadStore()

export const getStore = (): Store => store

export const updateStore = (storeChanges: Partial<Store>): void => {
  store = { ...store, ...storeChanges }
  saveStore(store)
}
