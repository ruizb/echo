import { Part } from '../models/part'
import { updateStore } from '../models/store'

export const id = 'part-2'

export const section = document.getElementById(id)

const elements = {
  soundsReactionsListField: document.getElementById(
    'user-info_sounds-reactions-list-field'
  ),
  soundsReactionsYesField: document.getElementById(
    'user-info_sounds-reactions-yes'
  ),
  soundsReactionsNoField: document.getElementById(
    'user-info_sounds-reactions-yes'
  )
}

const onSoundsReactionsYes = () =>
  elements.soundsReactionsListField?.classList.remove('hide')

const onSoundsReactionsNo = () =>
  elements.soundsReactionsListField?.classList.add('hide')

export const load = () => {
  updateStore({ partInProgress: Part.UserInfoForm })

  window.scroll(0, 0)

  $('i.icon.info').popup()

  elements.soundsReactionsYesField?.addEventListener(
    'click',
    onSoundsReactionsYes
  )
  elements.soundsReactionsNoField?.addEventListener(
    'click',
    onSoundsReactionsNo
  )
}

export const unload = () => {
  elements.soundsReactionsYesField?.removeEventListener(
    'click',
    onSoundsReactionsYes
  )
  elements.soundsReactionsNoField?.removeEventListener(
    'click',
    onSoundsReactionsNo
  )
}
