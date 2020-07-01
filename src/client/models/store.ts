import {
  hasOwnProperty,
  isArray,
  isBoolean,
  isNumber,
  isString
} from '../utils'
import { isValidNoiseTolerance, NoiseTolerance } from './noiseTolerance'
import { Part } from './part'
import { SoundTest, WithNameAndScore } from './soundTest'
import { isValidUserInfo, UserInfo } from './userInfo'

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
  soundVolume: 0.03,
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
