import { ListeningDevice } from '../../client/models/userInfo'
import transformResultsToCsv from './transformResultsToCsv'

describe('transformResultsToCsv', () => {
  const userInfo = {
    age: 28,
    device: ListeningDevice.HeadSet,
    hearingIssues: false,
    tinnitus: false,
    hearingHypersensibility: false,
    soundsReactions: false,
    soundsList: []
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
    expect(transformResultsToCsv({ userInfo, soundVolume, soundTests }))
      .toEqual(`age,device,hearingIssues,tinnitus,hearingHypersensibility,soundsReactions,soundsList,soundVolume,filename,score1,score2,score3
28,headset,no,no,no,no,,0.31,,,,
,,,,,,,,Birds_1.wav,33,35,31
,,,,,,,,Blowing_nose1.wav,76,68,73
,,,,,,,,Boire.wav,66,55,59`)
  })

  it('should handle the sounds list if user info contain "sounds reactions"', () => {
    const altUserInfo = {
      ...userInfo,
      soundsReactions: true,
      soundsList: ['a', 'b c d', 'e']
    }
    expect(
      transformResultsToCsv({ userInfo: altUserInfo, soundVolume, soundTests })
    )
      .toEqual(`age,device,hearingIssues,tinnitus,hearingHypersensibility,soundsReactions,soundsList,soundVolume,filename,score1,score2,score3
28,headset,no,no,no,yes,a/b c d/e,0.31,,,,
,,,,,,,,Birds_1.wav,33,35,31
,,,,,,,,Blowing_nose1.wav,76,68,73
,,,,,,,,Boire.wav,66,55,59`)
  })

  it('should adapt automatically according to the number of scores per sound', () => {
    const soundTests = [
      { name: 'Boire.wav', score: 66 },
      { name: 'Blowing_nose1.wav', score: 76 },
      { name: 'Boire.wav', score: 55 },
      { name: 'Blowing_nose1.wav', score: 73 }
    ]
    expect(transformResultsToCsv({ userInfo, soundVolume, soundTests }))
      .toEqual(`age,device,hearingIssues,tinnitus,hearingHypersensibility,soundsReactions,soundsList,soundVolume,filename,score1,score2
28,headset,no,no,no,no,,0.31,,,
,,,,,,,,Blowing_nose1.wav,76,73
,,,,,,,,Boire.wav,66,55`)
  })
})
