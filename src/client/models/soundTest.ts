import parsePath from 'parse-filepath'
import { excludeElementFromList, isDefined, last } from '../utils'
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

const createSoundTest = (filePath: string): SoundTest => ({
  filePath,
  name: extractFileName(filePath),
  score: 50
})

const initialBucket = audioFilePaths.reduce(
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

const electAudioFilePath = (bucket: Bucket): string => {
  const pickRandom = (filePaths: string[]): string =>
    filePaths[Math.floor(Math.random() * filePaths.length)]

  const availableAudioFilePaths = Object.getOwnPropertyNames(
    bucket.remainingSounds
  ).filter((filePath) => bucket.remainingSounds[filePath] > 0)
  const prevSoundTest = last(bucket.soundTests)

  return isDefined(prevSoundTest)
    ? pickRandom(
        excludeElementFromList(prevSoundTest.filePath, availableAudioFilePaths)
      )
    : pickRandom(availableAudioFilePaths)
}

const electSoundTest = (
  bucket: Bucket,
  electAudioFilePath: (bucket: Bucket) => string
): Bucket => {
  if (bucket.size === 0) {
    return bucket
  }
  const electedFilePath = electAudioFilePath(bucket)
  console.log({
    ...bucket,
    size: bucket.size - 1,
    remainingSounds: {
      ...bucket.remainingSounds,
      [electedFilePath]: bucket.remainingSounds[electedFilePath] - 1
    },
    soundTests: bucket.soundTests.concat([createSoundTest(electedFilePath)])
  })
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
  bucket = initialBucket,
  electAudioFilePath_ = electAudioFilePath
): SoundTest[] => electSoundTest(initialBucket, electAudioFilePath_).soundTests
