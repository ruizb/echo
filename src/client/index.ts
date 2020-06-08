import audioFilePaths, {
  getFilePathFromName,
  refSoundFilePath
} from './models/audioFilePath'
import { Part } from './models/part'
import { createSoundTests, SoundTest } from './models/soundTest'
import { getStore, initialStore, updateStore } from './models/store'
import {
  ListeningDevice,
  UserInfoBase,
  WithNoSoundsReactions,
  WithSoundsReactions
} from './models/userInfo'
import { createAudio, head, isDefined, isUndefined, noop, tail } from './utils'

const resetExperiment = (): void => {
  updateStore(initialStore)
  location.reload()
}

const parts = {
  [Part.Introduction]: {
    section: document.getElementById('part-1'),
    init: noop
  },
  [Part.UserInfoForm]: {
    section: document.getElementById('part-2'),
    init: loadPart2
  },
  [Part.SoundConfig]: {
    section: document.getElementById('part-3'),
    init: loadPart3
  },
  [Part.SoundTests]: {
    section: document.getElementById('part-4'),
    init: loadPart4
  }
}

const { partInProgress } = getStore()
parts[partInProgress].section?.classList.remove('hide')
parts[partInProgress].init()

function loadPart2(): void {
  parts[Part.Introduction].section?.classList.add('hide')
  parts[Part.UserInfoForm].section?.classList.remove('hide')

  updateStore({ partInProgress: Part.UserInfoForm })

  window.scroll(0, 0)

  $('i.icon.info').popup()

  const soundsReactionsListField = document.getElementById(
    'user-info_sounds-reactions-list-field'
  )

  document
    .getElementById('user-info_sounds-reactions-yes')
    ?.addEventListener('click', () =>
      soundsReactionsListField?.classList.remove('hide')
    )

  document
    .getElementById('user-info_sounds-reactions-no')
    ?.addEventListener('click', () =>
      soundsReactionsListField?.classList.add('hide')
    )
}

function loadPart3(): void {
  parts[Part.UserInfoForm].section?.classList.add('hide')
  parts[Part.SoundConfig].section?.classList.remove('hide')

  const formInputs = {
    age: document.querySelector(
      'input[name="user-info_age"]'
    ) as HTMLInputElement,
    device: document.querySelector(
      'input[name="user-info_device"]'
    ) as HTMLInputElement,
    hearingIssues: document.querySelector(
      'input[name="user-info_hearing-issues"]:checked'
    ) as HTMLInputElement,
    tinnitus: document.querySelector(
      'input[name="user-info_tinnitus"]:checked'
    ) as HTMLInputElement,
    hypersensibility: document.querySelector(
      'input[name="user-info_hypersensibility"]:checked'
    ) as HTMLInputElement,
    soundsReactions: document.querySelector(
      'input[name="user-info_sounds-reactions"]:checked'
    ) as HTMLInputElement,
    soundsReactionsList: document.querySelector(
      'textarea[name="user-info_sounds-reactions-list"]'
    ) as HTMLTextAreaElement
  }

  const baseUserInfo: UserInfoBase = {
    age: parseInt(formInputs.age.value, 10),
    device: formInputs.device.value as ListeningDevice,
    hearingIssues: formInputs.hearingIssues.value === 'yes',
    tinnitus: formInputs.tinnitus.value === 'yes',
    hearingHypersensibility: formInputs.hypersensibility.value === 'yes'
  }

  const restUserInfo: WithSoundsReactions | WithNoSoundsReactions =
    formInputs.soundsReactions.value === 'yes'
      ? {
          soundsReactions: true,
          soundsList: formInputs.soundsReactionsList.value
            .split(',')
            .map(_ => _.trim())
        }
      : { soundsReactions: false }

  updateStore({
    partInProgress: Part.SoundConfig,
    userInfo: {
      ...baseUserInfo,
      ...restUserInfo
    }
  })

  const { audioElement: refSoundAudioElement } = createAudio(
    document.getElementById('play-ref-sound') as HTMLButtonElement,
    refSoundFilePath,
    0.1
  )

  const refSoundSlider = document.getElementById(
    'ref-sound-slider'
  ) as HTMLInputElement | null

  refSoundSlider?.addEventListener(
    'change',
    () =>
      (refSoundAudioElement.volume = parseInt(refSoundSlider.value, 10) / 100)
  )
}

function loadPart4(): void {
  parts[Part.SoundConfig].section?.classList.add('hide')
  parts[Part.SoundTests].section?.classList.remove('hide')

  const soundTestsWithNoFilePath = getStore()
    .remainingSoundTests.map(({ name }) =>
      getFilePathFromName(audioFilePaths, name)
    )
    .filter(isUndefined)

  if (soundTestsWithNoFilePath.length > 0) {
    // if we find a file name that does not match any file path, reset the experiment
    resetExperiment()
  }

  const soundTests: SoundTest[] = getStore().remainingSoundTests.map(
    ({ name, score }) => ({
      name,
      score,
      filePath: getFilePathFromName(audioFilePaths, name) as string
    })
  )

  $('#experiment-progress-bar').progress({
    value: getStore().soundTests.length,
    total: soundTests.length,
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

  nextSound(soundTests, true)
}

document
  .getElementById('start-experiment')
  ?.addEventListener('click', loadPart2)

document.getElementById('user-info-form')?.addEventListener('submit', evt => {
  evt.preventDefault()
  loadPart3()
})

document.getElementById('start-tests')?.addEventListener('click', () => {
  const refSoundSlider = document.getElementById(
    'ref-sound-slider'
  ) as HTMLInputElement | null

  updateStore({
    partInProgress: Part.SoundTests,
    soundVolume: isDefined(refSoundSlider)
      ? parseInt(refSoundSlider.value, 10) / 100
      : 0.1,
    remainingSoundTests: createSoundTests().map(({ name, score }) => ({
      name,
      score
    }))
  })

  loadPart4()
})
