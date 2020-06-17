import { NoiseTolerance } from '../models/noiseTolerance'
import { Results } from '../models/results'
import { UserInfo } from '../models/userInfo'
import { groupBy } from './utils'
import { DestructuredCsv, generateCsv, mergeDestructuredCsvs } from './csv'

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
  ['user-info-label', 'user-info-value'],
  ['age', age.toString()],
  ['device', device],
  ['hearing-issues', hearingIssues],
  ['tinnitus', tinnitus],
  ['hearing-hypersens', hearingHypersensibility],
  ['sounds-reactions', soundsReactions],
  ['sounds-list', (soundsList ?? []).join('/')],
  ['sound-volume', soundVolume.toString()]
]

const generateNoiseToleranceCsv = ({
  statementsScores,
  soundsDislike
}: NoiseTolerance): DestructuredCsv => [
  ['noise-tolerance-label', 'noise-tolerance-value'],
  ...statementsScores.map((score, i) => [`statement-${i + 1}`, score]),
  ['sounds-dislike', soundsDislike]
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
  noiseTolerance,
  soundVolume,
  soundTests
}: Results): string =>
  generateCsv(
    mergeDestructuredCsvs([
      generateUserInfoCsv(userInfo, soundVolume),
      generateNoiseToleranceCsv(noiseTolerance),
      generateSoundTestsCsv(soundTests)
    ])
  )

export default transformResultsToCsv
