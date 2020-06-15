import { UserInfo } from './userInfo'

export interface Results {
  userInfo: UserInfo
  soundVolume: number
  soundTests: { name: string; score: number }[]
}
