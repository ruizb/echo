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
export const enum HypersensibilityImpact {
  NotAtAll = 'not-at-all',
  ALittle = 'a-little',
  Moderately = 'moderately',
  ALot = 'a-lot'
}

export type TriState = 'yes' | 'no' | 'unknown'

export interface UserInfo {
  age: number
  device: ListeningDevice
  hearingIssues: TriState
  tinnitus: TriState
  hearingHypersensibility: TriState
  hypersensibilityImpact: HypersensibilityImpact
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

const isValidHypersensibilityImpact = (
  hypersensibilityImpact: unknown
): hypersensibilityImpact is HypersensibilityImpact =>
  isString(hypersensibilityImpact) &&
  ([
    HypersensibilityImpact.NotAtAll,
    HypersensibilityImpact.ALittle,
    HypersensibilityImpact.Moderately,
    HypersensibilityImpact.ALot
  ] as string[]).indexOf(hypersensibilityImpact) >= 0

const isValidTriState = (state: unknown): state is TriState =>
  isString(state) && ['yes', 'no', 'unknown'].indexOf(state) >= 0

export const isValidUserInfo = (userInfo: unknown): userInfo is UserInfo =>
  isNull(userInfo) ||
  (isObject(userInfo) &&
    hasOwnProperty(userInfo, 'age') &&
    isNumber(userInfo.age) &&
    hasOwnProperty(userInfo, 'device') &&
    isValidDevice(userInfo.device) &&
    hasOwnProperty(userInfo, 'hearingIssues') &&
    isValidTriState(userInfo.hearingIssues) &&
    hasOwnProperty(userInfo, 'tinnitus') &&
    isValidTriState(userInfo.tinnitus) &&
    hasOwnProperty(userInfo, 'hearingHypersensibility') &&
    isValidTriState(userInfo.hearingHypersensibility) &&
    hasOwnProperty(userInfo, 'soundsReactions') &&
    isValidTriState(userInfo.soundsReactions) &&
    (userInfo.soundsReactions
      ? hasOwnProperty(userInfo, 'soundsList') && isArray(userInfo.soundsList)
      : true))
