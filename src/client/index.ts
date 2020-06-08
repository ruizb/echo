import { Part } from './models/part'
import { createSoundTests } from './models/soundTest'
import { getStore, initialStore, updateStore } from './models/store'
import { isDefined, noop } from './utils'
import * as introduction from './views/introduction'
import * as soundConfig from './views/soundConfig'
import * as userInfoForm from './views/userInfoForm'
import * as soundTests from './views/soundTests'

const resetExperiment = (): void => {
  updateStore(initialStore)
  location.reload()
}

const getSectionAndLoad = (part: Part): [HTMLElement | null, () => void] => {
  switch (part) {
    case Part.Introduction:
      return [introduction.section, noop]
    case Part.UserInfoForm:
      return [userInfoForm.section, userInfoForm.load(introduction.section)]
    case Part.SoundConfig:
      return [soundConfig.section, soundConfig.load(userInfoForm.section)]
    case Part.SoundTests:
      return [
        soundTests.section,
        soundTests.load(soundConfig.section, resetExperiment)
      ]
    default:
      return [null, noop]
  }
}

const [section, load] = getSectionAndLoad(getStore().partInProgress)

section?.classList.remove('hide')
load()

document
  .getElementById('start-experiment')
  ?.addEventListener('click', userInfoForm.load(introduction.section))

document.getElementById('user-info-form')?.addEventListener('submit', evt => {
  evt.preventDefault()
  soundConfig.load(userInfoForm.section)()
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

  soundTests.load(soundConfig.section, resetExperiment)()
})
