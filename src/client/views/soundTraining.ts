import { TFunction } from 'i18next'
import { trainingSound } from '../models/audioFilePath'
import { Part } from '../models/part'
import { getStore } from '../models/store'
import { head, isDefined, playSound, tail } from '../utils'

export const id = `${Part.SoundTraining}-section`

export const section = () => document.getElementById(id)

const elements = {
  trainingSoundSlider: () =>
    document.getElementById('training-sound-slider') as HTMLInputElement,
  nextTrainingButton: () => document.getElementById('next-training'),
  playTrainingSoundButton: () =>
    document.getElementById('play-training-sound') as HTMLButtonElement,
  startSoundTestsButton: () =>
    document.getElementById('start-tests') as HTMLButtonElement
}

let stopSound: () => void | undefined
let playSoundButtonClickListener: () => void | undefined

export const load = (translate: TFunction) => {
  const trainingSounds = [trainingSound.pleasant, trainingSound.unpleasant]
  nextTrainingSound(trainingSounds, translate, true)
}

export const unload = () => {
  stopSound?.call(null)
  elements
    .startSoundTestsButton()
    ?.removeEventListener('click', playSoundButtonClickListener)

  // FIXME not satisfied, but I couldn't find another way to remove all listeners...
  const nextTrainingButton = elements.nextTrainingButton()
  if (isDefined(nextTrainingButton)) {
    const newNextTrainingButton = nextTrainingButton.cloneNode(
      true
    ) as HTMLButtonElement
    nextTrainingButton.parentNode?.replaceChild(
      newNextTrainingButton,
      nextTrainingButton
    )
    elements.nextTrainingButton = () => newNextTrainingButton
  }
}

const nextTrainingSound = (
  trainingSoundPaths: string[],
  translate: TFunction,
  firstSoundTest: boolean = false
) => {
  stopSound?.call(null)
  elements
    .playTrainingSoundButton()
    ?.removeEventListener('click', playSoundButtonClickListener)

  const trainingSoundPath = head(trainingSoundPaths)
  const remainingTrainingSoundPaths = tail(trainingSoundPaths)

  if (isDefined(elements.trainingSoundSlider())) {
    elements.trainingSoundSlider().value = '50'
  }

  const nextButton =
    remainingTrainingSoundPaths.length === 0
      ? elements.startSoundTestsButton()
      : elements.nextTrainingButton()

  nextButton?.classList.add('disabled')

  if (isDefined(trainingSoundPath)) {
    if (nextButton === elements.startSoundTestsButton()) {
      elements.nextTrainingButton()?.classList.add('hide')
      elements.startSoundTestsButton()?.classList.remove('hide')
    } else {
      elements.nextTrainingButton()?.classList.remove('hide')
      elements.startSoundTestsButton()?.classList.add('hide')
    }

    const playButton = elements.playTrainingSoundButton()

    playSoundButtonClickListener = () => {
      const playLabel = playButton?.querySelector('span')

      if (isDefined(playLabel)) {
        playLabel.innerText = translate('common_playSound')
      }

      playButton?.classList.add('disabled')
      if (isDefined(playLabel)) {
        playLabel.innerText = translate('common_soundPlaying')
      }

      stopSound = playSound(trainingSoundPath, getStore().soundVolume, () => {
        playButton?.classList.remove('disabled')
        if (isDefined(playLabel)) {
          playLabel.innerText = translate('common_replaySound')
        }

        if (nextButton?.classList.contains('disabled')) {
          nextButton?.classList.remove('disabled')
        }
      })
    }

    playButton.addEventListener('click', playSoundButtonClickListener)

    if (!firstSoundTest) {
      playSoundButtonClickListener()
    }

    const onNextTrainingSound = () => {
      nextButton?.removeEventListener('click', onNextTrainingSound)
      nextTrainingSound(remainingTrainingSoundPaths, translate)
    }
    nextButton?.addEventListener('click', onNextTrainingSound)
  }
}
