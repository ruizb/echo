import { Results } from '../models/results'
import { UserInfo } from '../models/userInfo'
import { groupBy } from './utils'
import {
  booleanToCsvValue,
  DestructuredCsv,
  generateCsv,
  mergeDestructuredCsvs
} from './csv'

const generateUserInfoCsv = (
  {
    age,
    device,
    hearingIssues,
    tinnitus,
    hearingHypersensibility,
    soundsReactions,
    soundsList
  }: UserInfo,
  soundVolume: number
): DestructuredCsv => [
  [
    'age',
    'device',
    'hearingIssues',
    'tinnitus',
    'hearingHypersensibility',
    'soundsReactions',
    'soundsList',
    'soundVolume'
  ],
  [
    age.toString(),
    device,
    booleanToCsvValue(hearingIssues),
    booleanToCsvValue(tinnitus),
    booleanToCsvValue(hearingHypersensibility),
    booleanToCsvValue(soundsReactions),
    (soundsList ?? []).join('/'),
    soundVolume.toString()
  ]
]

const generateSoundTestsCsv = (
  soundTests: Results['soundTests']
): DestructuredCsv => {
  const resultsGroupByFileName = groupBy(soundTests, ({ name }) => name)
  const uniqueSortedFileNames = Object.keys(resultsGroupByFileName).sort()
  const numberOfTestsPerSound =
    resultsGroupByFileName[uniqueSortedFileNames[0]].length

  return [
    [
      'filename',
      ...new Array(numberOfTestsPerSound)
        .fill('')
        .map((_, i) => `score${i + 1}`)
    ],
    ...uniqueSortedFileNames.map(fileName => [
      fileName,
      ...resultsGroupByFileName[fileName].map(({ score }) => score.toString())
    ])
  ]
}

/**
 * Transform a Results object into 2 CSV strings: one for user info, the other for sounds scores.
 */
const transformResultsToCsv = ({
  userInfo,
  soundVolume,
  soundTests
}: Results & { userInfo: UserInfo }): string =>
  generateCsv(
    mergeDestructuredCsvs([
      generateUserInfoCsv(userInfo, soundVolume),
      generateSoundTestsCsv(soundTests)
    ])
  )

export default transformResultsToCsv
