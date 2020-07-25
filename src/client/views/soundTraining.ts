import { TFunction } from 'i18next'
import { trainingSound } from '../models/audioFilePath'
import { Part } from '../models/part'
import { getStore } from '../models/store'
import { createAudio, head, isDefined, tail } from '../utils'

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

let audioCache:
  | ReturnType<ReturnType<typeof createAudio>>
  | undefined = undefined

export const load = (translate: TFunction) => {
  const trainingSounds = [trainingSound.pleasant, trainingSound.unpleasant]
  nextTrainingSound(trainingSounds, translate)
}

export const unload = () => {
  if (isDefined(audioCache)) {
    audioCache.audioElement.pause()
    audioCache.removePlayButtonClickListener()
  }

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
  translate: TFunction
) => {
  if (isDefined(audioCache)) {
    audioCache.audioElement.pause()
    audioCache.removePlayButtonClickListener()
  }

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

    audioCache = createAudio(translate)(
      elements.playTrainingSoundButton(),
      trainingSoundPath,
      getStore().soundVolume,
      () => {
        if (nextButton?.classList.contains('disabled')) {
          nextButton?.classList.remove('disabled')
        }
      }
    )

    const onNextTrainingSound = () => {
      nextButton?.removeEventListener('click', onNextTrainingSound)
      nextTrainingSound(remainingTrainingSoundPaths, translate)
    }
    nextButton?.addEventListener('click', onNextTrainingSound)
  }
}
