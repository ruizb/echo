import { Part } from './models/part'
import { createSoundTests } from './models/soundTest'
import { getStore, initialStore, updateStore } from './models/store'
import { isDefined, noop, sectionTransition } from './utils'
import * as introduction from './views/introduction'
import { handleUserInfoForm } from './views/soundConfig'
import * as soundConfig from './views/soundConfig'
import * as userInfoForm from './views/userInfoForm'
import * as soundTests from './views/soundTests'
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
    case Part.SoundConfig:
      return [soundConfig.section, soundConfig.load, soundConfig.unload]
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

const [section, load, unload] = getSectionAndLoad(getStore().partInProgress)

section?.classList.remove('hide')
load()

document.getElementById('start-experiment')?.addEventListener('click', () =>
  sectionTransition({
    from: introduction,
    to: userInfoForm,
    onComplete: () => {
      introduction.unload()
      userInfoForm.load()
    }
  })
)

document.getElementById('user-info-form')?.addEventListener('submit', evt => {
  evt.preventDefault()

  sectionTransition({
    from: userInfoForm,
    to: soundConfig,
    onComplete: () => {
      handleUserInfoForm()
      userInfoForm.unload()
      soundConfig.load()
    }
  })
})

document.getElementById('start-tests')?.addEventListener('click', () => {
  const refSoundSlider = document.getElementById(
    'ref-sound-slider'
  ) as HTMLInputElement | null

  updateStore({
    partInProgress: Part.SoundTests,
    soundVolume: isDefined(refSoundSlider)
      ? parseInt(refSoundSlider.value, 10) / 100
      : 0.1
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
    from: soundConfig,
    to: soundTests,
    onComplete: () => {
      soundTests.load(resetExperiment)()
      soundConfig.unload()
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
