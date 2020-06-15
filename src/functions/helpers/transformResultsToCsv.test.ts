import { ListeningDevice } from '../../client/models/userInfo'
import { NoiseTolerance } from '../models/noiseTolerance'
import { UserInfo } from '../models/userInfo'
import transformResultsToCsv from './transformResultsToCsv'

describe('transformResultsToCsv', () => {
  const userInfo: UserInfo = {
    age: 28,
    device: ListeningDevice.HeadSet,
    hearingIssues: false,
    tinnitus: false,
    hearingHypersensibility: false,
    soundsReactions: false,
    soundsList: []
  }
  const noiseTolerance: NoiseTolerance = {
    statementsScores: ['1', '2', '1'],
    soundsDislike: '5'
  }
  const soundVolume = 0.31
  const soundTests = [
    { name: 'Boire.wav', score: 66 },
    { name: 'Birds_1.wav', score: 33 },
    { name: 'Blowing_nose1.wav', score: 76 },
    { name: 'Birds_1.wav', score: 35 },
    { name: 'Blowing_nose1.wav', score: 68 },
    { name: 'Boire.wav', score: 55 },
    { name: 'Birds_1.wav', score: 31 },
    { name: 'Blowing_nose1.wav', score: 73 },
    { name: 'Boire.wav', score: 59 }
  ]

  it('should correctly transform some results into a CSV string', () => {
    expect(
      transformResultsToCsv({
        userInfo,
        noiseTolerance,
        soundVolume,
        soundTests
      })
    )
      .toEqual(`user-info-label,user-info-value,noise-tolerance-label,noise-tolerance-score,filename,score1,score2,score3
age,28,,,,,,
device,headset,,,,,,
hearing-issues,no,,,,,,
tinnitus,no,,,,,,
hearing-hypersens,no,,,,,,
sounds-reactions,no,,,,,,
sounds-list,,,,,,,
sound-volume,0.31,,,,,,
,,statement-1,1,,,,
,,statement-2,2,,,,
,,statement-3,1,,,,
,,sounds-dislike,5,,,,
,,,,Birds_1.wav,33,35,31
,,,,Blowing_nose1.wav,76,68,73
,,,,Boire.wav,66,55,59`)
  })

  it('should handle the sounds list if user info contain "sounds reactions"', () => {
    const altUserInfo = {
      ...userInfo,
      soundsReactions: true,
      soundsList: ['a', 'b c d', 'e']
    }
    expect(
      transformResultsToCsv({
        userInfo: altUserInfo,
        noiseTolerance,
        soundVolume,
        soundTests
      })
    )
      .toEqual(`user-info-label,user-info-value,noise-tolerance-label,noise-tolerance-score,filename,score1,score2,score3
age,28,,,,,,
device,headset,,,,,,
hearing-issues,no,,,,,,
tinnitus,no,,,,,,
hearing-hypersens,no,,,,,,
sounds-reactions,yes,,,,,,
sounds-list,a/b c d/e,,,,,,
sound-volume,0.31,,,,,,
,,statement-1,1,,,,
,,statement-2,2,,,,
,,statement-3,1,,,,
,,sounds-dislike,5,,,,
,,,,Birds_1.wav,33,35,31
,,,,Blowing_nose1.wav,76,68,73
,,,,Boire.wav,66,55,59`)
  })

  it('should adapt automatically according to the number of scores per sound', () => {
    const soundTests = [
      { name: 'Boire.wav', score: 66 },
      { name: 'Blowing_nose1.wav', score: 76 },
      { name: 'Boire.wav', score: 55 },
      { name: 'Blowing_nose1.wav', score: 73 }
    ]
    expect(
      transformResultsToCsv({
        userInfo,
        noiseTolerance,
        soundVolume,
        soundTests
      })
    )
      .toEqual(`user-info-label,user-info-value,noise-tolerance-label,noise-tolerance-score,filename,score1,score2
age,28,,,,,
device,headset,,,,,
hearing-issues,no,,,,,
tinnitus,no,,,,,
hearing-hypersens,no,,,,,
sounds-reactions,no,,,,,
sounds-list,,,,,,
sound-volume,0.31,,,,,
,,statement-1,1,,,
,,statement-2,2,,,
,,statement-3,1,,,
,,sounds-dislike,5,,,
,,,,Blowing_nose1.wav,76,73
,,,,Boire.wav,66,55`)
  })
})
