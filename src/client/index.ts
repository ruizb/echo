import audioUrl from './sounds/ref-sound-sch-250Hz.wav'

document.getElementById('start-experiment')?.addEventListener('click', () => {
  document.getElementById('part-1')?.classList.add('hide')
  document.getElementById('part-2')?.classList.remove('hide')
})

document
  .getElementById('configure-sound')
  ?.addEventListener('submit', (evt) => {
    evt.preventDefault()
    document.getElementById('part-2')?.classList.add('hide')
    document.getElementById('part-3')?.classList.remove('hide')
  })

document.getElementById('start-tests')?.addEventListener('click', () => {
  document.getElementById('part-3')?.classList.add('hide')
  document.getElementById('part-4')?.classList.remove('hide')
})

$('i.icon.info').popup()

document
  .querySelectorAll('input[type="radio"][name="sounds-reactions"]')
  .forEach((radioBtn) =>
    radioBtn.addEventListener('change', (evt) => {
      const radioBtnIsYes = (evt.target as HTMLInputElement).value === 'yes'
      document
        .getElementById('sounds-reactions-list-field')
        ?.classList.remove(radioBtnIsYes ? 'hide' : 'show')
      document
        .getElementById('sounds-reactions-list-field')
        ?.classList.add(radioBtnIsYes ? 'show' : 'hide')
    })
  )

const audio = new Audio(audioUrl)
audio.volume = 0.1
audio.addEventListener('ended', () =>
  document.getElementById('play-ref-sound')?.classList.remove('disabled')
)

document
  .getElementById('play-ref-sound')
  ?.addEventListener('click', ({ target }) => {
    ;(target as HTMLButtonElement).classList.add('disabled')
    audio.play()
  })

document
  .getElementById('ref-sound-slider')
  ?.addEventListener('change', ({ target }) => {
    audio.volume = parseInt((target as HTMLInputElement).value, 10) / 100
  })
