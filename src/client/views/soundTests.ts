import audioFilePaths, { getFilePathFromName } from '../models/audioFilePath'
import { sendData } from '../models/results'
import { SoundTest } from '../models/soundTest'
import { getStore, updateStore } from '../models/store'
import { createAudio, head, isDefined, isUndefined, noop, tail } from '../utils'

export const id = 'part-4'

export const section = document.getElementById(id)

const elements = {
  sliderPleasantLabel: document.getElementById('sound-test-slider-pleasant'),
  sliderNeutralLabel: document.getElementById('sound-test-slider-neutral'),
  sliderUnpleasantLabel: document.getElementById(
    'sound-test-slider-unpleasant'
  ),
  nextTestButton: document.getElementById('next-test'),
  testSoundSlider: document.getElementById(
    'test-sound-slider'
  ) as HTMLInputElement,
  playTestSoundButton: document.getElementById(
    'play-test-sound'
  ) as HTMLButtonElement,
  playTestSoundButtonContainer: document.getElementById(
    'play-test-sound-button-container'
  ),
  playTestSoundLabelsContainer: document.getElementById(
    'play-test-sound-labels-container'
  ),
  playTestSoundSliderContainer: document.getElementById(
    'play-test-sound-slider-container'
  ),
  dataAutoSentMessage: document.getElementById('data-auto-sent-message'),
  reconfigureSoundButton: document.getElementById('reconfigure-sound')
}

let audioCache: ReturnType<typeof createAudio> | undefined = undefined

const onSliderPleasantClick = () => setTestSoundSlider(0)
const onSliderNeutralClick = () => setTestSoundSlider(50)
const onSliderUnpleasantClick = () => setTestSoundSlider(100)

export const load = (resetExperiment: () => void) => () => {
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

  updateProgressBar(
    completedSoundTests.length,
    completedSoundTests.length + remainingSoundTests.length
  )

  elements.sliderPleasantLabel?.addEventListener('click', onSliderPleasantClick)
  elements.sliderNeutralLabel?.addEventListener('click', onSliderNeutralClick)
  elements.sliderUnpleasantLabel?.addEventListener(
    'click',
    onSliderUnpleasantClick
  )

  nextSound(remainingSoundTestsWithFilePath, true)
}

export const unload = () => {
  if (isDefined(audioCache)) {
    audioCache.removePlayButtonClickListener()
  }
  elements.sliderPleasantLabel?.removeEventListener(
    'click',
    onSliderPleasantClick
  )
  elements.sliderNeutralLabel?.removeEventListener(
    'click',
    onSliderNeutralClick
  )
  elements.sliderUnpleasantLabel?.removeEventListener(
    'click',
    onSliderUnpleasantClick
  )

  // not satisfied, but I couldn't find another way to remove all listeners...
  if (isDefined(elements.nextTestButton)) {
    const newNextTestButton = elements.nextTestButton.cloneNode(
      true
    ) as HTMLButtonElement
    elements.nextTestButton.parentNode?.replaceChild(
      newNextTestButton,
      elements.nextTestButton
    )
    elements.nextTestButton = newNextTestButton
  }
}

const updateProgressBar = (value: number, total: number) => {
  $('#experiment-progress-bar').progress({
    value,
    total,
    text: {
      active: 'Expérience en cours...',
      success: 'Expérience terminée !'
    }
  })
}

const setTestSoundSlider = (score: number) =>
  ((document.getElementById(
    'test-sound-slider'
  ) as HTMLInputElement).value = String(score))

const terminateExperiment = () => {
  if (!getStore().dataSent) {
    updateStore({ dataSent: true })
    sendData()
  }
  document.querySelectorAll(`#${id} > p`).forEach(_ => _.classList.add('hide'))
  elements.reconfigureSoundButton?.parentElement?.classList.add('hide')
  elements.nextTestButton?.parentElement?.classList.add('hide')
  elements.playTestSoundButtonContainer?.classList.add('hide')
  elements.playTestSoundLabelsContainer?.classList.add('hide')
  elements.playTestSoundSliderContainer?.classList.add('hide')
  elements.dataAutoSentMessage?.classList.remove('hide')
}

const nextSound = (
  soundTests: SoundTest[],
  firstSoundTest: boolean = false
) => {
  elements.nextTestButton?.classList.add('disabled')

  if (isDefined(audioCache)) {
    audioCache.audioElement.pause()
    audioCache.removePlayButtonClickListener()
  }

  const soundTest = head(soundTests)
  const remainingSoundTests = tail(soundTests)

  if (isDefined(soundTest)) {
    setTestSoundSlider(soundTest.score)

    audioCache = createAudio(
      elements.playTestSoundButton,
      soundTest.filePath,
      getStore().soundVolume,
      () => {
        if (elements.nextTestButton?.classList.contains('disabled')) {
          elements.nextTestButton?.classList.remove('disabled')
        }
      }
    )

    if (!firstSoundTest) {
      audioCache.play()
    }

    const onNextSoundTest = () => {
      elements.nextTestButton?.removeEventListener('click', onNextSoundTest)

      $('#experiment-progress-bar').progress('increment', 1)

      updateStore({
        soundTests: [
          ...getStore().soundTests,
          {
            name: soundTest.name,
            score: parseInt(elements.testSoundSlider.value, 10)
          } as SoundTest
        ],
        remainingSoundTests: remainingSoundTests.map(({ name, score }) => ({
          name,
          score
        }))
      })

      nextSound(remainingSoundTests)
    }
    elements.nextTestButton?.addEventListener('click', onNextSoundTest)
  } else {
    terminateExperiment()
  }
}
