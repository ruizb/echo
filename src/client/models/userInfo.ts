import {
  hasOwnProperty,
  isArray,
  isNull,
  isNumber,
  isObject,
  isString
} from '../utils'

export const enum ListeningDevice {
  HeadSet = 'headset',
  EarPhones = 'earphones',
  Speakers = 'speakers'
}

export type TriState = 'yes' | 'no' | 'unknown'

export interface UserInfo {
  age: number
  nationality: string
  device: ListeningDevice
  hearingIssues: TriState
  tinnitus: TriState
  hearingHypersensitivity: TriState
  soundsReactions: TriState
  soundsList: string[]
}

const isValidDevice = (device: unknown): device is ListeningDevice =>
  isString(device) &&
  ([
    ListeningDevice.HeadSet,
    ListeningDevice.EarPhones,
    ListeningDevice.Speakers
  ] as string[]).indexOf(device) >= 0

const isValidTriState = (state: unknown): state is TriState =>
  isString(state) && ['yes', 'no', 'unknown'].indexOf(state) >= 0

export const isValidUserInfo = (userInfo: unknown): userInfo is UserInfo =>
  isNull(userInfo) ||
  (isObject(userInfo) &&
    hasOwnProperty(userInfo, 'age') &&
    isNumber(userInfo.age) &&
    hasOwnProperty(userInfo, 'nationality') &&
    isString(userInfo.nationality) &&
    hasOwnProperty(userInfo, 'device') &&
    isValidDevice(userInfo.device) &&
    hasOwnProperty(userInfo, 'hearingIssues') &&
    isValidTriState(userInfo.hearingIssues) &&
    hasOwnProperty(userInfo, 'tinnitus') &&
    isValidTriState(userInfo.tinnitus) &&
    hasOwnProperty(userInfo, 'hearingHypersensitivity') &&
    isValidTriState(userInfo.hearingHypersensitivity) &&
    hasOwnProperty(userInfo, 'soundsReactions') &&
    isValidTriState(userInfo.soundsReactions) &&
    (userInfo.soundsReactions
      ? hasOwnProperty(userInfo, 'soundsList') && isArray(userInfo.soundsList)
      : true))
