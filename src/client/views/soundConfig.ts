import { refSoundFilePath } from '../models/audioFilePath'
import { Part } from '../models/part'
import { updateStore } from '../models/store'
import {
  ListeningDevice,
  UserInfoBase,
  WithNoSoundsReactions,
  WithSoundsReactions
} from '../models/userInfo'
import { createAudio } from '../utils'

export const section = document.getElementById('part-3')

export const load = (prevSection: HTMLElement | null) => () => {
  prevSection?.classList.add('hide')
  section?.classList.remove('hide')

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
