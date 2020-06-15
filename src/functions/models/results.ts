import { NoiseTolerance } from './noiseTolerance'
import { UserInfo } from './userInfo'

export interface Results {
  userInfo: UserInfo
  noiseTolerance: NoiseTolerance
  soundVolume: number
  soundTests: { name: string; score: number }[]
}
