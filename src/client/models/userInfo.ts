import { isString } from '../utils'

export const enum ListeningDevice {
  HeadSet = 'headset',
  EarPhones = 'earphones'
}

export interface UserInfo {
  age: number
  device: ListeningDevice
  hearingIssues: boolean
  tinnitus: boolean
  hearingHypersensibility: boolean
  soundsReactions: boolean
  soundsList: string[]
}

export const isValidDevice = (device: unknown): device is ListeningDevice =>
  isString(device) &&
  ([ListeningDevice.HeadSet, ListeningDevice.EarPhones] as string[]).indexOf(
    device
  ) >= 0
