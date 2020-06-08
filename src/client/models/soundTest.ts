import parsePath from 'parse-filepath'
import {
  excludeElementFromList,
  head,
  isDefined,
  last,
  pickRandomElement,
  tail
} from '../utils'
import audioFilePaths from './audioFilePath'

export interface SoundTest {
  name: string
  filePath: string
  score: number // [0,100]
}

interface Bucket {
  size: number
  remainingSounds: { [soundFilePath: string]: number }
  soundTests: SoundTest[]
}

export type PickFilePath = (filePaths: string[]) => string

// test-retest strategy: a given sound is played 3 times during the experience
const testRetestTimes = 3

const emptyBucket: Bucket = {
  size: 0,
  remainingSounds: {},
  soundTests: []
}

const extractFileName = (filePath: string): string => {
  const [extension, , ...fileName] = parsePath(filePath)
    .base.split('.')
    .reverse()
  return `${fileName}.${extension}`
}

export const createSoundTest = (filePath: string): SoundTest => ({
  filePath,
  name: extractFileName(filePath),
  score: 50
})

export const createInitialBucket = (filePaths: string[]) =>
  filePaths.reduce(
    ({ size, remainingSounds, soundTests }: Bucket, audioFilePath: string) => ({
      size: size + testRetestTimes,
      remainingSounds: {
        ...remainingSounds,
        [audioFilePath]: testRetestTimes
      },
      soundTests
    }),
    emptyBucket
  )

const electAudioFilePath = (pickFilePath: PickFilePath) => (
  bucket: Bucket
): string => {
  const filePaths = Object.getOwnPropertyNames(bucket.remainingSounds)

  const maxRemainingOccurrences = tail(filePaths).reduce(
    (max, filePath) => Math.max(max, bucket.remainingSounds[filePath]),
    bucket.remainingSounds[head(filePaths) as string]
  )

  const candidateFilePaths = filePaths.filter(
    filePath => bucket.remainingSounds[filePath] >= maxRemainingOccurrences
  )

  const prevSoundTest = last(bucket.soundTests)

  return isDefined(prevSoundTest)
    ? pickFilePath(
        excludeElementFromList(prevSoundTest.filePath, candidateFilePaths)
      )
    : pickFilePath(candidateFilePaths)
}

const electSoundTest = (
  bucket: Bucket,
  electAudioFilePath: (bucket: Bucket) => string
): Bucket => {
  if (bucket.size === 0) {
    return bucket
  }
  const electedFilePath = electAudioFilePath(bucket)
  return electSoundTest(
    {
      ...bucket,
      size: bucket.size - 1,
      remainingSounds: {
        ...bucket.remainingSounds,
        [electedFilePath]: bucket.remainingSounds[electedFilePath] - 1
      },
      soundTests: bucket.soundTests.concat([createSoundTest(electedFilePath)])
    },
    electAudioFilePath
  )
}

export const createSoundTests = (
  bucket: Bucket = createInitialBucket(audioFilePaths),
  pickFilePath: PickFilePath = pickRandomElement
): SoundTest[] =>
  electSoundTest(bucket, electAudioFilePath(pickFilePath)).soundTests
