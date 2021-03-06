import { TFunction } from 'i18next'
import audioFilePaths, { getFilePathFromName } from '../models/audioFilePath'
import { Part } from '../models/part'
import { SoundTest } from '../models/soundTest'
import { getStore, updateStore } from '../models/store'
import playSound from '../playSound'
import { head, isDefined, isUndefined, tail } from '../utils'

export const id = `${Part.SoundTests}-section`

export const section = () => document.getElementById(id)

const elements = {
  sliderPleasantLabel: () =>
    document.getElementById('sound-test-slider-pleasant'),
  sliderNeutralLabel: () =>
    document.getElementById('sound-test-slider-neutral'),
  sliderUnpleasantLabel: () =>
    document.getElementById('sound-test-slider-unpleasant'),
  nextTestButton: () => document.getElementById('next-test'),
  testSoundSlider: () =>
    document.getElementById('test-sound-slider') as HTMLInputElement,
  playTestSoundButton: () =>
    document.getElementById('play-test-sound') as HTMLButtonElement,
  endExperimentButton: () =>
    document.getElementById('end-experiment') as HTMLButtonElement
}

let stopSound: () => void | undefined
let playSoundButtonClickListener: () => void | undefined

const onSliderPleasantClick = () => setTestSoundSlider(0)
const onSliderNeutralClick = () => setTestSoundSlider(50)
const onSliderUnpleasantClick = () => setTestSoundSlider(100)

export const load = (
  resetExperiment: () => void,
  translate: TFunction
) => () => {
  const remainingSoundTests = getStore().remainingSoundTests

  const soundTestsWithNoFilePath = remainingSoundTests
    .map(({ name }) => getFilePathFromName(audioFilePaths, name))
    .filter(isUndefined)

  if (soundTestsWithNoFilePath.length > 0) {
    // if we find a file name that does not match any file path, reset the experiment
    resetExperiment()
  }

  const remainingSoundTestsWithFilePath: SoundTest[] = remainingSoundTests.map(
    ({ name, score }) => ({
      name,
      score,
      filePath: getFilePathFromName(audioFilePaths, name) as string
    })
  )

  const completedSoundTests = getStore().soundTests

  updateProgressBar(translate)(
    completedSoundTests.length,
    completedSoundTests.length + remainingSoundTests.length
  )

  elements
    .sliderPleasantLabel()
    ?.addEventListener('click', onSliderPleasantClick)
  elements.sliderNeutralLabel()?.addEventListener('click', onSliderNeutralClick)
  elements
    .sliderUnpleasantLabel()
    ?.addEventListener('click', onSliderUnpleasantClick)

  nextSound(remainingSoundTestsWithFilePath, translate, true)
}

export const unload = () => {
  stopSound?.call(null)
  elements
    .playTestSoundButton()
    ?.removeEventListener('click', playSoundButtonClickListener)

  elements
    .sliderPleasantLabel()
    ?.removeEventListener('click', onSliderPleasantClick)
  elements
    .sliderNeutralLabel()
    ?.removeEventListener('click', onSliderNeutralClick)
  elements
    .sliderUnpleasantLabel()
    ?.removeEventListener('click', onSliderUnpleasantClick)

  // FIXME not satisfied, but I couldn't find another way to remove all listeners...
  const nextTestButton = elements.nextTestButton()
  if (isDefined(nextTestButton)) {
    const newNextTestButton = nextTestButton.cloneNode(
      true
    ) as HTMLButtonElement
    nextTestButton.parentNode?.replaceChild(newNextTestButton, nextTestButton)
    elements.nextTestButton = () => newNextTestButton
  }
}

const updateProgressBar = (translate: TFunction) => (
  value: number,
  total: number
) => {
  $('#experiment-progress-bar').progress({
    value,
    total,
    text: {
      active: translate('soundTests_experimentInProgress'),
      success: translate('soundTests_experimentOver')
    }
  })
}

const setTestSoundSlider = (score: number) =>
  ((document.getElementById(
    'test-sound-slider'
  ) as HTMLInputElement).value = String(score))

const nextSound = (
  soundTests: SoundTest[],
  translate: TFunction,
  firstSoundTest: boolean = false
) => {
  stopSound?.call(null)
  elements
    .playTestSoundButton()
    ?.removeEventListener('click', playSoundButtonClickListener)

  const soundTest = head(soundTests)
  const remainingSoundTests = tail(soundTests)

  const nextButton =
    remainingSoundTests.length === 0
      ? elements.endExperimentButton()
      : elements.nextTestButton()

  nextButton?.classList.add('disabled')

  if (isDefined(soundTest)) {
    if (nextButton === elements.endExperimentButton()) {
      elements.nextTestButton()?.classList.add('hide')
      elements.endExperimentButton()?.classList.remove('hide')
    }

    setTestSoundSlider(soundTest.score)

    const playButton = elements.playTestSoundButton()

    playSoundButtonClickListener = () => {
      const playLabel = playButton?.querySelector('span')

      playButton?.classList.add('disabled')
      if (isDefined(playLabel)) {
        playLabel.innerText = translate('common_soundPlaying')
      }

      stopSound = playSound(soundTest.filePath, getStore().soundVolume, () => {
        playButton?.classList.remove('disabled')
        if (isDefined(playLabel)) {
          playLabel.innerText = translate('common_replaySound')
        }

        if (nextButton?.classList.contains('disabled')) {
          nextButton?.classList.remove('disabled')
        }
      })
    }

    playButton.addEventListener('click', playSoundButtonClickListener)

    if (!firstSoundTest) {
      playSoundButtonClickListener()
    }

    const onNextSoundTest = () => {
      nextButton?.removeEventListener('click', onNextSoundTest)

      $('#experiment-progress-bar').progress('increment', 1)

      updateStore({
        soundTests: [
          ...getStore().soundTests,
          {
            name: soundTest.name,
            score: parseInt(elements.testSoundSlider().value, 10)
          } as SoundTest
        ],
        remainingSoundTests: remainingSoundTests.map(({ name, score }) => ({
          name,
          score
        }))
      })

      nextSound(remainingSoundTests, translate)
    }
    nextButton?.addEventListener('click', onNextSoundTest)
  }
}
