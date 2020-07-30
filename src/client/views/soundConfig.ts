import { TFunction } from 'i18next'
import { refSoundFilePath } from '../models/audioFilePath'
import { Part } from '../models/part'
import { getStore, updateStore } from '../models/store'
import { isDefined, playSound } from '../utils'

export const id = `${Part.SoundConfig}-section`

export const section = () => document.getElementById(id)

const elements = {
  playRefSoundButton: () =>
    document.getElementById('play-ref-sound') as HTMLButtonElement,
  refSoundSlider: () =>
    document.getElementById('ref-sound-slider') as HTMLInputElement | null
}

let stopSound: () => void | undefined
let playSoundButtonClickListener: () => void | undefined

const onRefSoundSliderChange = () => {
  const refSoundSlider = elements.refSoundSlider()
  if (isDefined(refSoundSlider)) {
    updateStore({ soundVolume: parseInt(refSoundSlider.value, 10) / 100 })
  }
}

export const load = (translate: TFunction) => {
  stopSound?.call(null)

  const playButton = elements.playRefSoundButton()

  playSoundButtonClickListener = () => {
    const playLabel = playButton?.querySelector('span')

    playButton?.classList.add('disabled')
    if (isDefined(playLabel)) {
      playLabel.innerText = translate('common_soundPlaying')
    }

    stopSound = playSound(refSoundFilePath, getStore().soundVolume, () => {
      playButton?.classList.remove('disabled')
      if (isDefined(playLabel)) {
        playLabel.innerText = translate('common_replaySound')
      }
    })
  }

  playButton.addEventListener('click', playSoundButtonClickListener)

  const refSoundSlider = elements.refSoundSlider()
  if (isDefined(refSoundSlider)) {
    refSoundSlider.value = String(getStore().soundVolume * 100)
    refSoundSlider.addEventListener('change', onRefSoundSliderChange)
  }
}

export const unload = () => {
  stopSound?.call(null)
  elements
    .playRefSoundButton()
    ?.removeEventListener('click', playSoundButtonClickListener)
  elements
    .refSoundSlider()
    ?.removeEventListener('change', onRefSoundSliderChange)
}
