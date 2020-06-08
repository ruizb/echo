import { isString } from '../utils'

export const enum ListeningDevice {
  HeadSet = 'headset',
  EarPhones = 'earphones'
}

export interface UserInfoBase {
  age: number
  device: ListeningDevice
  hearingIssues: boolean
  tinnitus: boolean
  hearingHypersensibility: boolean
}

export interface WithNoSoundsReactions {
  soundsReactions: false
}

export interface WithSoundsReactions {
  soundsReactions: true
  soundsList: string[]
}

type UserInfoNoSoundsReactions = UserInfoBase & WithNoSoundsReactions
type UserInfoWithSoundsReactions = UserInfoBase & WithSoundsReactions

export type UserInfo = UserInfoNoSoundsReactions | UserInfoWithSoundsReactions

export const isValidDevice = (device: unknown): device is ListeningDevice =>
  isString(device) &&
  ([ListeningDevice.HeadSet, ListeningDevice.EarPhones] as string[]).indexOf(
    device
  ) >= 0
