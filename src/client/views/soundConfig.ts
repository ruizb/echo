import { refSoundFilePath } from '../models/audioFilePath'
import { Part } from '../models/part'
import { getStore, updateStore } from '../models/store'
import {
  ListeningDevice,
  UserInfoBase,
  WithNoSoundsReactions,
  WithSoundsReactions
} from '../models/userInfo'
import { createAudio, isDefined } from '../utils'

export const id = 'part-3'

export const section = document.getElementById(id)

const elements = {
  playRefSoundButton: document.getElementById(
    'play-ref-sound'
  ) as HTMLButtonElement,
  refSoundSlider: document.getElementById(
    'ref-sound-slider'
  ) as HTMLInputElement | null,
  ageField: document.querySelector(
    'input[name="user-info_age"]'
  ) as HTMLInputElement,
  deviceField: document.querySelector(
    'input[name="user-info_device"]'
  ) as HTMLInputElement,
  hearingIssuesField: document.querySelector(
    'input[name="user-info_hearing-issues"]:checked'
  ) as HTMLInputElement,
  tinnitusField: document.querySelector(
    'input[name="user-info_tinnitus"]:checked'
  ) as HTMLInputElement,
  hypersensibilityField: document.querySelector(
    'input[name="user-info_hypersensibility"]:checked'
  ) as HTMLInputElement,
  soundsReactionsField: document.querySelector(
    'input[name="user-info_sounds-reactions"]:checked'
  ) as HTMLInputElement,
  soundsReactionsListField: document.querySelector(
    'textarea[name="user-info_sounds-reactions-list"]'
  ) as HTMLTextAreaElement
}

let audioCache: ReturnType<typeof createAudio> | undefined = undefined

export const handleUserInfoForm = () => {
  const baseUserInfo: UserInfoBase = {
    age: parseInt(elements.ageField.value, 10),
    device: elements.deviceField.value as ListeningDevice,
    hearingIssues: elements.hearingIssuesField.value === 'yes',
    tinnitus: elements.tinnitusField.value === 'yes',
    hearingHypersensibility: elements.hypersensibilityField.value === 'yes'
  }

  const restUserInfo: WithSoundsReactions | WithNoSoundsReactions =
    elements.soundsReactionsField.value === 'yes'
      ? {
          soundsReactions: true,
          soundsList: elements.soundsReactionsListField.value
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
}

const onRefSoundSliderChange = () => {
  if (isDefined(elements.refSoundSlider) && isDefined(audioCache)) {
    audioCache.audioElement.volume =
      parseInt(elements.refSoundSlider.value, 10) / 100
  }
}

export const load = () => {
  if (isDefined(audioCache)) {
    audioCache.removePlayButtonClickListener()
  }
  audioCache = createAudio(
    elements.playRefSoundButton,
    refSoundFilePath,
    getStore().soundVolume
  )

  if (isDefined(elements.refSoundSlider)) {
    elements.refSoundSlider.value = String(getStore().soundVolume * 100)
  }

  elements.refSoundSlider?.addEventListener('change', onRefSoundSliderChange)
}

export const unload = () => {
  if (isDefined(audioCache)) {
    audioCache.removePlayButtonClickListener()
  }
  elements.refSoundSlider?.removeEventListener('change', onRefSoundSliderChange)
}
