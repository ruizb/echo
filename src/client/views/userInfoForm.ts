import { Part } from '../models/part'
import { updateStore } from '../models/store'
import { ListeningDevice, TriState, UserInfo } from '../models/userInfo'
import * as nationalities from 'i18n-nationality'

export const id = `${Part.UserInfoForm}-section`

export const section = () => document.getElementById(id)

const elements = {
  soundsReactionsListField: () =>
    document.getElementById('user-info_sounds-reactions-list-field'),
  age: () =>
    document.querySelector('input[name="user-info_age"]') as HTMLInputElement,
  nationality: () =>
    document.querySelector(
      'select[name="user-info_nationality"]'
    ) as HTMLSelectElement,
  device: () =>
    document.querySelector(
      'input[name="user-info_device"]:checked'
    ) as HTMLInputElement,
  hearingIssues: () =>
    document.querySelector(
      'input[name="user-info_hearing-issues"]:checked'
    ) as HTMLInputElement,
  tinnitus: () =>
    document.querySelector(
      'input[name="user-info_tinnitus"]:checked'
    ) as HTMLInputElement,
  hypersensitivity: () =>
    document.querySelector(
      'input[name="user-info_hypersensitivity"]:checked'
    ) as HTMLInputElement,
  soundsReactions: () =>
    document.querySelector(
      'input[name="user-info_sounds-reactions"]:checked'
    ) as HTMLInputElement,
  soundsReactionsList: () =>
    document.querySelector(
      'textarea[name="user-info_sounds-reactions-list"]'
    ) as HTMLTextAreaElement,
  soundsReactionsInputs: () =>
    Array.from(
      document.querySelectorAll('input[name="user-info_sounds-reactions"]')
    ) as HTMLInputElement[]
}

export const handleUserInfoForm = () => {
  const soundsReactions = elements.soundsReactions().value as TriState
  const userInfo: UserInfo = {
    age: parseInt(elements.age().value, 10),
    nationality: elements.nationality().value.toLowerCase(),
    device: elements.device().value as ListeningDevice,
    hearingIssues: elements.hearingIssues().value as TriState,
    tinnitus: elements.tinnitus().value as TriState,
    hearingHypersensitivity: elements.hypersensitivity().value as TriState,
    soundsReactions,
    soundsList: soundsReactions
      ? elements
          .soundsReactionsList()
          .value.split(',')
          .map(_ => _.trim())
      : []
  }

  updateStore({ userInfo })
}

const onSoundsReactionsChange = () =>
  elements.soundsReactions().value === 'yes'
    ? elements.soundsReactionsListField()?.classList.remove('hide')
    : elements.soundsReactionsListField()?.classList.add('hide')

const registerNationalitiesLocale = (languageAlpha2: string): string => {
  switch (languageAlpha2) {
    case 'en':
      nationalities.registerLocale(require(`i18n-nationality/langs/en.json`))
      return languageAlpha2
    case 'fr':
      nationalities.registerLocale(require(`i18n-nationality/langs/fr.json`))
      return languageAlpha2
    default:
      console.warn(
        `Could not find nationalities locale file for language "${languageAlpha2}", fallback to "en"`
      )
      nationalities.registerLocale(require(`i18n-nationality/langs/en.json`))
      return 'en'
  }
}

export const load = (languageAlpha2: string) => () => {
  window.scroll(0, 0)

  $('i.icon.info').popup()

  const usedLanguageAlpha2 = registerNationalitiesLocale(languageAlpha2)

  const nationalityAlpha2CodesAndNames = nationalities.getNames(
    usedLanguageAlpha2
  )

  const selectOptions = Object.keys(nationalityAlpha2CodesAndNames).reduce(
    (opts, alpha2Code) => {
      const nationality = nationalityAlpha2CodesAndNames[alpha2Code]
      return opts.concat(
        `<option value="${alpha2Code}">${nationality} (${alpha2Code})</option>`
      )
    },
    [`<option value=""></option>`] as string[]
  )

  elements.nationality().innerHTML = selectOptions.join('')

  elements
    .soundsReactionsInputs()
    .forEach(input => input.addEventListener('change', onSoundsReactionsChange))
}

export const unload = () => {
  elements
    .soundsReactionsInputs()
    .forEach(input =>
      input.removeEventListener('change', onSoundsReactionsChange)
    )
}
