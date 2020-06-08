import { createSoundTests, SoundTest } from './models/soundTest'
import { refSoundFilePath } from './models/audioFilePath'
import { head, isDefined, noop, tail } from './utils'

const part1 = document.getElementById('part-1')
const part2 = document.getElementById('part-2')
const part3 = document.getElementById('part-3')
const part4 = document.getElementById('part-4')

document.getElementById('start-experiment')?.addEventListener('click', () => {
  part1?.classList.add('hide')
  part2?.classList.remove('hide')

  window.scroll(0, 0)

  $('i.icon.info').popup()

  const soundsReactionsListField = document.getElementById(
    'sounds-reactions-list-field'
  )
  document
    .querySelectorAll<HTMLInputElement>(
      'input[type="radio"][name="sounds-reactions"]'
    )
    .forEach((radioBtn) =>
      radioBtn.addEventListener('change', () => {
        const radioBtnIsYes = radioBtn.value === 'yes'
        soundsReactionsListField?.classList.remove(
          radioBtnIsYes ? 'hide' : 'show'
        )
        soundsReactionsListField?.classList.add(radioBtnIsYes ? 'show' : 'hide')
      })
    )
})

const createAudio = (
  playButton: HTMLButtonElement | undefined,
  filePath: string,
  volume: number,
  onEnded: () => void = noop
): {
  audioElement: HTMLAudioElement
  play: () => void
  removeListener: () => void
} => {
  const playLabel = playButton?.querySelector('span')

  const audio = new Audio(filePath)
  audio.volume = volume

  if (isDefined(playLabel)) {
    playLabel.innerText = 'Jouer le son'
  }

  audio.addEventListener('ended', () => {
    playButton?.classList.remove('disabled')
    if (isDefined(playLabel)) {
      playLabel.innerText = 'Rejouer le son'
    }
    onEnded()
  })

  const play = () => {
    playButton?.classList.add('disabled')
    if (isDefined(playLabel)) {
      playLabel.innerText = 'Lecture du son en cours...'
    }
    audio.play()
  }

  const listener = () => {
    if (audio.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      play()
    } else {
      audio.addEventListener('canplaythrough', play)
    }
  }
  playButton?.addEventListener('click', listener)

  return {
    audioElement: audio,
    play,
    removeListener: () => playButton?.removeEventListener('click', listener)
  }
}

document.getElementById('user-info-form')?.addEventListener('submit', (evt) => {
  evt.preventDefault()
  part2?.classList.add('hide')
  part3?.classList.remove('hide')

  // TODO store values in a UserInfo object

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
})

document.getElementById('start-tests')?.addEventListener('click', () => {
  part3?.classList.add('hide')
  part4?.classList.remove('hide')

  const soundTests = createSoundTests()

  $('#experiment-progress-bar').progress({
    value: 0,
    total: soundTests.length,
    text: {
      active: 'Expérience en cours...',
      success: 'Expérience terminée !'
    }
  })

  const nextTestButton = document.getElementById('next-test')

  // TODO use volume set by user in part3
  const volumeFromPart3 = 0.1

  const setTestSoundSlider = (score: number) =>
    ((document.getElementById(
      'test-sound-slider'
    ) as HTMLInputElement).value = String(score))

  document
    .getElementById('sound-test-slider-pleasant')
    ?.addEventListener('click', () => {
      setTestSoundSlider(0)
    })
  document
    .getElementById('sound-test-slider-neutral')
    ?.addEventListener('click', () => {
      setTestSoundSlider(50)
    })
  document
    .getElementById('sound-test-slider-unpleasant')
    ?.addEventListener('click', () => {
      setTestSoundSlider(100)
    })

  const nextSound = (
    soundTests: SoundTest[],
    firstSoundTest: boolean = false
  ) => {
    nextTestButton?.classList.add('disabled')
    const soundTest = head(soundTests)
    if (isDefined(soundTest)) {
      setTestSoundSlider(soundTest.score)
      const { audioElement, play, removeListener } = createAudio(
        document.getElementById('play-test-sound') as HTMLButtonElement,
        soundTest.filePath,
        volumeFromPart3,
        () => {
          if (nextTestButton?.classList.contains('disabled')) {
            nextTestButton?.classList.remove('disabled')
          }
        }
      )

      if (!firstSoundTest) {
        play()
      }

      const onClick = () => {
        nextTestButton?.removeEventListener('click', onClick)
        removeListener()
        audioElement.pause()
        $('#experiment-progress-bar').progress('increment', 1)
        // TODO save to localStorage
        nextSound(tail(soundTests))
      }
      nextTestButton?.addEventListener('click', onClick)
    } else {
      nextTestButton?.parentElement?.classList.add('hide')
      document
        .getElementById('play-test-sound-button-container')
        ?.classList.add('hide')
      document
        .getElementById('play-test-sound-labels-container')
        ?.classList.add('hide')
      document
        .getElementById('play-test-sound-slider-container')
        ?.classList.add('hide')
      document
        .getElementById('data-auto-sent-message')
        ?.classList.remove('hide')
    }
  }

  nextSound(soundTests, true)
})
