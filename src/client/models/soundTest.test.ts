import { head } from '../utils'
import {
  createInitialBucket,
  createSoundTest,
  createSoundTests,
  PickFilePath
} from './soundTest'

// Parcel generates a random string for each imported file names
const parcelImportUID = 'abc123'

const soundPath = (soundName: string): string =>
  `/path/to/${soundName}.${parcelImportUID}.wav`

const filePaths = [
  soundPath('sound1'),
  soundPath('sound2'),
  soundPath('sound3')
]

describe('createInitialBucket', () => {
  it('should create an initial bucket, given a list of sound file paths', () => {
    expect(createInitialBucket(filePaths)).toEqual({
      size: 9,
      remainingSounds: {
        [soundPath('sound1')]: 3,
        [soundPath('sound2')]: 3,
        [soundPath('sound3')]: 3
      },
      soundTests: []
    })
  })

  it('should create an initial bucket, given an empty list of sound file paths', () => {
    expect(createInitialBucket([])).toEqual({
      size: 0,
      remainingSounds: {},
      soundTests: []
    })
  })
})

describe('createSoundTest', () => {
  it('should sanitize the sound name by removing path prefix + Parcel UID', () => {
    const importedFilePath = soundPath('sound1')
    expect(createSoundTest(importedFilePath)).toEqual({
      filePath: importedFilePath,
      name: 'sound1.wav',
      score: 50
    })
  })
})

describe('createSoundTests', () => {
  const pickFilePath: PickFilePath = filePaths => head(filePaths) as string

  it('should create 3 times as many sound tests are there are provided sounds', () => {
    expect(
      createSoundTests(createInitialBucket(filePaths), pickFilePath).length
    ).toEqual(filePaths.length * 3)
  })

  it('should create exactly 3 occurrences for every sound', () => {
    const soundTests = createSoundTests(
      createInitialBucket(filePaths),
      pickFilePath
    )
    const filePathToOccurrences = filePaths.reduce(
      (acc: (readonly [string, number])[], filePath) => [
        ...acc,
        [
          filePath,
          soundTests.filter(soundTest => soundTest.filePath === filePath).length
        ] as const
      ],
      []
    )
    expect(
      filePathToOccurrences.every(([, occurrences]) => occurrences === 3)
    ).toBe(true)
  })

  it('should create sound tests where 2 consecutive sounds cannot be the same', () => {
    // This test might be unstable due to Math.random
    // If it fails too many times, remove it -> should be integration or e2e test
    const soundTests = createSoundTests(createInitialBucket(filePaths))
    for (let i = 1, n = soundTests.length; i < n; i++) {
      expect(soundTests[i].filePath).not.toEqual(soundTests[i - 1].filePath)
    }
  })
})
