import parsePath from 'parse-filepath'
import { excludeElementFromList, last } from '../utils'
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

const electAudioFilePath = (
  prevSoundTest: SoundTest | undefined,
  audioFilePaths: string[]
): string => {
  const pickRandom = (filePaths: string[]): string =>
    filePaths[Math.floor(Math.random() * filePaths.length)]
  return prevSoundTest === undefined
    ? pickRandom(audioFilePaths)
    : pickRandom(excludeElementFromList(prevSoundTest.filePath, audioFilePaths))
}

const electSoundTest = (
  bucket: Bucket,
  electAudioFilePath: (
    prevSoundTest: SoundTest | undefined,
    audioFilePaths: string[]
  ) => string
): Bucket => {
  if (bucket.size === 0) {
    return bucket
  }
  const electedFilePath = electAudioFilePath(
    last(bucket.soundTests),
    audioFilePaths
  )
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
