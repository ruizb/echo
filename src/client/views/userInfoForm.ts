import { Part } from '../models/part'
import { updateStore } from '../models/store'
import { ListeningDevice, UserInfo } from '../models/userInfo'

export const id = `${Part.UserInfoForm}-section`

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
  ),
  age: document.querySelector(
    'input[name="user-info_age"]'
  ) as HTMLInputElement,
  device: document.querySelector(
    'input[name="user-info_device"]'
  ) as HTMLInputElement,
  hearingIssues: document.querySelector(
    'input[name="user-info_hearing-issues"]:checked'
  ) as HTMLInputElement,
  tinnitus: document.querySelector(
    'input[name="user-info_tinnitus"]:checked'
  ) as HTMLInputElement,
  hypersensibility: document.querySelector(
    'input[name="user-info_hypersensibility"]:checked'
  ) as HTMLInputElement,
  soundsReactions: document.querySelector(
    'input[name="user-info_sounds-reactions"]:checked'
  ) as HTMLInputElement,
  soundsReactionsList: document.querySelector(
    'textarea[name="user-info_sounds-reactions-list"]'
  ) as HTMLTextAreaElement
}

export const handleUserInfoForm = () => {
  const soundsReactions = elements.soundsReactions.value === 'yes'
  const userInfo: UserInfo = {
    age: parseInt(elements.age.value, 10),
    device: elements.device.value as ListeningDevice,
    hearingIssues: elements.hearingIssues.value === 'yes',
    tinnitus: elements.tinnitus.value === 'yes',
    hearingHypersensibility: elements.hypersensibility.value === 'yes',
    soundsReactions,
    soundsList: soundsReactions
      ? elements.soundsReactionsList.value.split(',').map(_ => _.trim())
      : []
  }

  updateStore({ userInfo })
}

const onSoundsReactionsYes = () =>
  elements.soundsReactionsListField?.classList.remove('hide')

const onSoundsReactionsNo = () =>
  elements.soundsReactionsListField?.classList.add('hide')

export const load = () => {
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
