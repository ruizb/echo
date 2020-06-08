import { Part } from '../models/part'
import { updateStore } from '../models/store'

export const section = document.getElementById('part-2')

export const load = (prevSection: HTMLElement | null) => () => {
  prevSection?.classList.add('hide')
  section?.classList.remove('hide')

  updateStore({ partInProgress: Part.UserInfoForm })

  window.scroll(0, 0)

  $('i.icon.info').popup()

  const soundsReactionsListField = document.getElementById(
    'user-info_sounds-reactions-list-field'
  )

  document
    .getElementById('user-info_sounds-reactions-yes')
    ?.addEventListener('click', () =>
      soundsReactionsListField?.classList.remove('hide')
    )

  document
    .getElementById('user-info_sounds-reactions-no')
    ?.addEventListener('click', () =>
      soundsReactionsListField?.classList.add('hide')
    )
}
