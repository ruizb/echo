import { Part } from '../models/part'
import { updateStore } from '../models/store'
import { ListeningDevice, TriState, UserInfo } from '../models/userInfo'

export const id = `${Part.UserInfoForm}-section`

export const section = document.getElementById(id)

const elements = {
  soundsReactionsListField: document.getElementById(
    'user-info_sounds-reactions-list-field'
  ),
  age: document.querySelector(
    'input[name="user-info_age"]'
  ) as HTMLInputElement,
  device: document.querySelector(
    'input[name="user-info_device"]'
  ) as HTMLInputElement,
  hearingIssues: () =>
    document.querySelector(
      'input[name="user-info_hearing-issues"]:checked'
    ) as HTMLInputElement,
  tinnitus: () =>
    document.querySelector(
      'input[name="user-info_tinnitus"]:checked'
    ) as HTMLInputElement,
  hypersensibility: () =>
    document.querySelector(
      'input[name="user-info_hypersensibility"]:checked'
    ) as HTMLInputElement,
  hypersensibilityImpact: () =>
    document.querySelector(
      'input[name="user-info_hypersensibilityImpact"]:checked'
    ) as HTMLInputElement,
  soundsReactions: () =>
    document.querySelector(
      'input[name="user-info_sounds-reactions"]:checked'
    ) as HTMLInputElement,
  soundsReactionsList: document.querySelector(
    'textarea[name="user-info_sounds-reactions-list"]'
  ) as HTMLTextAreaElement,
  soundsReactionsInputs: Array.from(
    document.querySelectorAll('input[name="user-info_sounds-reactions"]')
  ) as HTMLInputElement[]
}

export const handleUserInfoForm = () => {
  const soundsReactions = elements.soundsReactions().value as TriState
  const userInfo: UserInfo = {
    age: parseInt(elements.age.value, 10),
    device: elements.device.value as ListeningDevice,
    hearingIssues: elements.hearingIssues().value as TriState,
    tinnitus: elements.tinnitus().value as TriState,
    hearingHypersensibility: elements.hypersensibility().value as TriState,
    hypersensibilityImpact: elements.hypersensibilityImpact()
      .value as HypersensibilityImpact,
    soundsReactions,
    soundsList: soundsReactions
      ? elements.soundsReactionsList.value.split(',').map(_ => _.trim())
      : []
  }

  updateStore({ userInfo })
}

const onSoundsReactionsChange = () =>
  elements.soundsReactions().value === 'yes'
    ? elements.soundsReactionsListField?.classList.remove('hide')
    : elements.soundsReactionsListField?.classList.add('hide')

export const load = () => {
  window.scroll(0, 0)

  $('i.icon.info').popup()

  elements.soundsReactionsInputs.forEach(input =>
    input.addEventListener('change', onSoundsReactionsChange)
  )
}

export const unload = () => {
  elements.soundsReactionsInputs.forEach(input =>
    input.removeEventListener('change', onSoundsReactionsChange)
  )
}
