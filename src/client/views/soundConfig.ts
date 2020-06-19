import { refSoundFilePath } from '../models/audioFilePath'
import { Part } from '../models/part'
import { getStore } from '../models/store'
import { createAudio, isDefined } from '../utils'

export const id = `${Part.SoundConfig}-section`

export const section = document.getElementById(id)

const elements = {
  playRefSoundButton: document.getElementById(
    'play-ref-sound'
  ) as HTMLButtonElement,
  refSoundSlider: document.getElementById(
    'ref-sound-slider'
  ) as HTMLInputElement | null
}

let audioCache: ReturnType<typeof createAudio> | undefined = undefined

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
    audioCache.audioElement.pause()
    audioCache.removePlayButtonClickListener()
  }
  elements.refSoundSlider?.removeEventListener('change', onRefSoundSliderChange)
}
