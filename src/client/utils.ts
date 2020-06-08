export const excludeElementFromList = <A>(element: A, list: A[]): A[] =>
  list
    .slice(0, list.indexOf(element))
    .concat(list.slice(list.indexOf(element) + 1, list.length))

export const pickRandomElement = <A>(items: A[]): A =>
  items[Math.floor(Math.random() * items.length)]

export const head = <A>(list: A[]): A | undefined => list[0]

export const tail = <A>(list: A[]): A[] => list.slice(1)

export const last = <A>(list: A[]): A | undefined => list[list.length - 1]

export const isDefined = <A>(
  value: A | undefined | null
): value is NonNullable<A> => !isNull(value) && !isUndefined(value)

export const isNull = (value: unknown): value is null => value === null

export const isUndefined = (value: unknown): value is undefined =>
  value === undefined

export const isString = (value: unknown): value is string =>
  typeof value === 'string'

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number'

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean'

export const isArray = <A>(value: unknown): value is A[] => Array.isArray(value)

export const isObject = (value: unknown): value is object =>
  value !== null && typeof value === 'object'

export const hasOwnProperty = <X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> => obj.hasOwnProperty(prop)

export const noop = () => {}

export const createAudio = (
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
    if (
      [
        HTMLMediaElement.HAVE_ENOUGH_DATA,
        HTMLMediaElement.HAVE_CURRENT_DATA
      ].indexOf(audio.readyState) >= 0
    ) {
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
