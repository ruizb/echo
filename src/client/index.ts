import { Part } from './models/part'
import { createSoundTests } from './models/soundTest'
import { getStore, initialStore, updateStore } from './models/store'
import { isDefined, noop, sectionTransition } from './utils'
import * as introduction from './views/introduction'
import { handleNoiseToleranceForm } from './views/noiseToleranceForm'
import * as soundConfig from './views/soundConfig'
import { handleUserInfoForm } from './views/userInfoForm'
import * as userInfoForm from './views/userInfoForm'
import * as noiseToleranceForm from './views/noiseToleranceForm'
import * as soundTests from './views/soundTests'
import * as soundTraining from './views/soundTraining'
import * as end from './views/end'

const resetExperiment = (): void => {
  updateStore(initialStore)
  location.reload()
}

const getSectionAndLoad = (
  part: Part
): [HTMLElement | null, () => void, () => void] => {
  switch (part) {
    case Part.Introduction:
      return [introduction.section, introduction.load, introduction.unload]
    case Part.UserInfoForm:
      return [userInfoForm.section, userInfoForm.load, userInfoForm.unload]
    case Part.NoiseToleranceForm:
      return [
        noiseToleranceForm.section,
        noiseToleranceForm.load,
        noiseToleranceForm.unload
      ]
    case Part.SoundConfig:
      return [soundConfig.section, soundConfig.load, soundConfig.unload]
    case Part.SoundTraining:
      return [soundTraining.section, soundTraining.load, soundTraining.unload]
    case Part.SoundTests:
      return [
        soundTests.section,
        soundTests.load(resetExperiment),
        soundTests.unload
      ]
    case Part.End:
      return [end.section, end.load, end.unload]
    default:
      return [null, noop, noop]
  }
}

const [section, load] = getSectionAndLoad(getStore().partInProgress)

section?.classList.remove('hide')
load()

/**
 * If viewport height is smaller than container height, remove `height: 100%` rule
 * as it can crop some parts of the view on some browsers, such as Safari.
 */
const bodyHeight = document.body.getBoundingClientRect().height
const mainContainer: HTMLElement | null = document.body.querySelector(
  '.ui.container'
)
if (isDefined(mainContainer)) {
  const mainContainerHeight = mainContainer.getBoundingClientRect().height ?? 0
  console.log(bodyHeight, mainContainerHeight)
  if (mainContainerHeight > bodyHeight) {
    mainContainer.parentElement?.style.setProperty('height', 'auto')
  }
}

document.getElementById('start-experiment')?.addEventListener('click', () => {
  updateStore({ partInProgress: Part.UserInfoForm })

  sectionTransition({
    from: introduction,
    to: userInfoForm,
    onComplete: () => {
      introduction.unload()
      userInfoForm.load()
    }
  })
})

document.getElementById('user-info-form')?.addEventListener('submit', evt => {
  evt.preventDefault()

  updateStore({ partInProgress: Part.NoiseToleranceForm })

  sectionTransition({
    from: userInfoForm,
    to: noiseToleranceForm,
    onComplete: () => {
      handleUserInfoForm()
      userInfoForm.unload()
      noiseToleranceForm.load()
    }
  })
})

document
  .getElementById('noise-tolerance-form')
  ?.addEventListener('submit', evt => {
    evt.preventDefault()

    updateStore({ partInProgress: Part.SoundConfig })

    sectionTransition({
      from: noiseToleranceForm,
      to: soundConfig,
      onComplete: () => {
        handleNoiseToleranceForm()
        noiseToleranceForm.unload()
        soundConfig.load()
      }
    })
  })

document.getElementById('start-training')?.addEventListener('click', () => {
  const refSoundSlider = document.getElementById(
    'ref-sound-slider'
  ) as HTMLInputElement | null

  updateStore({
    partInProgress: Part.SoundTraining,
    soundVolume: isDefined(refSoundSlider)
      ? parseInt(refSoundSlider.value, 10) / 100
      : 0.1
  })

  sectionTransition({
    from: soundConfig,
    to: soundTraining,
    onComplete: () => {
      soundConfig.unload()
      soundTraining.load()
    }
  })
})

document.getElementById('reconfigure-sound')?.addEventListener('click', () => {
  sectionTransition({
    from: soundTraining,
    to: soundConfig,
    direction: 'backward',
    onComplete: () => {
      soundTraining.unload()
      soundConfig.load()
    }
  })
})

document.getElementById('start-tests')?.addEventListener('click', () => {
  updateStore({
    partInProgress: Part.SoundTests
  })

  if (getStore().remainingSoundTests.length === 0) {
    updateStore({
      remainingSoundTests: createSoundTests().map(({ name, score }) => ({
        name,
        score
      }))
    })
  }

  sectionTransition({
    from: soundTraining,
    to: soundTests,
    onComplete: () => {
      soundTraining.unload()
      soundTests.load(resetExperiment)()
    }
  })
})

document.getElementById('end-experiment')?.addEventListener('click', () => {
  updateStore({
    partInProgress: Part.End
  })

  sectionTransition({
    from: soundTests,
    to: end,
    onComplete: () => {
      soundTests.unload()
      end.load()
    }
  })
})
