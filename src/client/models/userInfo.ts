const enum ListeningDevice {
  HeadSet = 'headset',
  EarPhones = 'earphones'
}

interface UserInfoBase<A extends boolean> {
  age: number
  device: ListeningDevice
  hearingIssues: boolean
  tinnitus: boolean
  hearingHypersensibility: boolean
  soundsReactions: A
}

interface UserInfoNoSoundsReactions extends UserInfoBase<false> {}

interface UserInfoWithSoundsReactions extends UserInfoBase<true> {
  soundsList: string[]
}

export type UserInfo = UserInfoNoSoundsReactions | UserInfoWithSoundsReactions
