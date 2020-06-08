import { Part } from './part'
import { SoundTest } from './soundTest'
import { UserInfo } from './userInfo'

export interface Store {
  partInProgress: Part
  userInfo: UserInfo
  soundVolume: number
  soundTests: SoundTest[]
}
