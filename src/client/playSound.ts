import { isDefined } from './utils'

// @ts-ignore
window.AudioContext = window.AudioContext ?? window.webkitAudioContext

const context = new AudioContext()

const audioBuffersCache: { [soundFilePath: string]: AudioBuffer } = {}

const playSound = (
  soundFilePath: string,
  volume: number,
  onEnded: () => void
): (() => void) => {
  const gainNode = context.createGain()
  gainNode.gain.setValueAtTime(volume, context.currentTime)

  const source = context.createBufferSource()
  source.connect(gainNode)
  gainNode.connect(context.destination)

  source.addEventListener('ended', onEnded)

  const play = (buffer: AudioBuffer) => {
    source.buffer = buffer
    source.start(0)
  }

  if (isDefined(audioBuffersCache[soundFilePath])) {
    play(audioBuffersCache[soundFilePath])
  } else {
    window
      .fetch(soundFilePath)
      .then(response => response.arrayBuffer())
      .then(buffer =>
        context.decodeAudioData(buffer, buffer => {
          audioBuffersCache[soundFilePath] = buffer
          play(buffer)
        })
      )
  }

  return () => {
    try {
      source.stop()
    } catch {}
  }
}

export default playSound
