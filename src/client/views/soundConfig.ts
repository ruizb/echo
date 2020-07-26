import { TFunction } from 'i18next'
import { refSoundFilePath } from '../models/audioFilePath'
import { Part } from '../models/part'
import { getStore } from '../models/store'
import { createAudio, isDefined } from '../utils'

export const id = `${Part.SoundConfig}-section`

export const section = () => document.getElementById(id)

const elements = {
  playRefSoundButton: () =>
    document.getElementById('play-ref-sound') as HTMLButtonElement,
  refSoundSlider: () =>
    document.getElementById('ref-sound-slider') as HTMLInputElement | null
}

let audioCache:
  | ReturnType<ReturnType<typeof createAudio>>
  | undefined = undefined

const onRefSoundSliderChange = () => {
  const refSoundSlider = elements.refSoundSlider()
  if (isDefined(refSoundSlider) && isDefined(audioCache)) {
    audioCache.audioElement.volume = parseInt(refSoundSlider.value, 10) / 100
  }
}

export const load = (translate: TFunction) => {
  if (isDefined(audioCache)) {
    audioCache.removePlayButtonClickListener()
  }
  audioCache = createAudio(translate)(
    elements.playRefSoundButton(),
    refSoundFilePath,
    getStore().soundVolume
  )

  const refSoundSlider = elements.refSoundSlider()
  if (isDefined(refSoundSlider)) {
    refSoundSlider.value = String(getStore().soundVolume * 100)
  }

  elements.refSoundSlider()?.addEventListener('change', onRefSoundSliderChange)
}

export const unload = () => {
  if (isDefined(audioCache)) {
    audioCache.audioElement.pause()
    audioCache.removePlayButtonClickListener()
  }
  elements
    .refSoundSlider()
    ?.removeEventListener('change', onRefSoundSliderChange)
}
