import audioFilePaths, { getFilePathFromName } from '../models/audioFilePath'
import { SoundTest } from '../models/soundTest'
import { getStore, updateStore } from '../models/store'
import { createAudio, head, isDefined, isUndefined, tail } from '../utils'

export const section = document.getElementById('part-4')

export const load = (
  prevSection: HTMLElement | null,
  resetExperiment: () => void
) => () => {
  prevSection?.classList.add('hide')
  section?.classList.remove('hide')

  const soundTestsWithNoFilePath = getStore()
    .remainingSoundTests.map(({ name }) =>
      getFilePathFromName(audioFilePaths, name)
    )
    .filter(isUndefined)

  if (soundTestsWithNoFilePath.length > 0) {
    // if we find a file name that does not match any file path, reset the experiment
    resetExperiment()
  }

  const remainingSoundTests: SoundTest[] = getStore().remainingSoundTests.map(
    ({ name, score }) => ({
      name,
      score,
      filePath: getFilePathFromName(audioFilePaths, name) as string
    })
  )

  const completedSoundTests = getStore().soundTests

  $('#experiment-progress-bar').progress({
    value: completedSoundTests.length,
    total: completedSoundTests.length + remainingSoundTests.length,
    text: {
      active: 'Expérience en cours...',
      success: 'Expérience terminée !'
    }
  })

  const nextTestButton = document.getElementById('next-test')

  const setTestSoundSlider = (score: number) =>
    ((document.getElementById(
      'test-sound-slider'
    ) as HTMLInputElement).value = String(score))

  document
    .getElementById('sound-test-slider-pleasant')
    ?.addEventListener('click', () => {
      setTestSoundSlider(0)
    })
  document
    .getElementById('sound-test-slider-neutral')
    ?.addEventListener('click', () => {
      setTestSoundSlider(50)
    })
  document
    .getElementById('sound-test-slider-unpleasant')
    ?.addEventListener('click', () => {
      setTestSoundSlider(100)
    })

  const nextSound = (
    soundTests: SoundTest[],
    firstSoundTest: boolean = false
  ) => {
    nextTestButton?.classList.add('disabled')
    const soundTest = head(soundTests)
    if (isDefined(soundTest)) {
      setTestSoundSlider(soundTest.score)
      const { audioElement, play, removeListener } = createAudio(
        document.getElementById('play-test-sound') as HTMLButtonElement,
        soundTest.filePath,
        getStore().soundVolume,
        () => {
          if (nextTestButton?.classList.contains('disabled')) {
            nextTestButton?.classList.remove('disabled')
          }
        }
      )

      if (!firstSoundTest) {
        play()
      }

      const onClick = () => {
        nextTestButton?.removeEventListener('click', onClick)
        removeListener()
        audioElement.pause()
        $('#experiment-progress-bar').progress('increment', 1)
        updateStore({
          soundTests: [
            ...getStore().soundTests,
            {
              name: soundTest.name,
              score: parseInt(
                (document.getElementById(
                  'test-sound-slider'
                ) as HTMLInputElement).value,
                10
              )
            } as SoundTest
          ],
          remainingSoundTests: tail(
            soundTests.map(({ name, score }) => ({ name, score }))
          )
        })
        nextSound(tail(soundTests))
      }
      nextTestButton?.addEventListener('click', onClick)
    } else {
      nextTestButton?.parentElement?.classList.add('hide')
      document
        .getElementById('play-test-sound-button-container')
        ?.classList.add('hide')
      document
        .getElementById('play-test-sound-labels-container')
        ?.classList.add('hide')
      document
        .getElementById('play-test-sound-slider-container')
        ?.classList.add('hide')
      document
        .getElementById('data-auto-sent-message')
        ?.classList.remove('hide')
    }
  }

  nextSound(remainingSoundTests, true)
}
