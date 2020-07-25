import { Part } from '../models/part'
import { updateStore } from '../models/store'
import { isDefined } from '../utils'
import { TFunction } from 'i18next'

export const id = `${Part.NoiseToleranceForm}-section`

export const section = () => document.getElementById(id)

const elements = {
  noiseToleranceFormElement: () =>
    document.querySelector('form#noise-tolerance-form') as HTMLFormElement,
  noiseToleranceSoundsDislike: () =>
    document.querySelector(
      'input[name="noise-tolerance_sounds-dislike"]:checked'
    ) as HTMLInputElement,
  noiseToleranceSliderN: (n: number) =>
    document.querySelector(
      `input[name="${generateIdForInput(n)}"]`
    ) as HTMLInputElement
}

const statements = (translate: TFunction) => [
  translate('noiseTolerance_statement1'),
  translate('noiseTolerance_statement2'),
  translate('noiseTolerance_statement3'),
  translate('noiseTolerance_statement4'),
  translate('noiseTolerance_statement5'),
  translate('noiseTolerance_statement6'),
  translate('noiseTolerance_statement7'),
  translate('noiseTolerance_statement8'),
  translate('noiseTolerance_statement9'),
  translate('noiseTolerance_statement10'),
  translate('noiseTolerance_statement11'),
  translate('noiseTolerance_statement12'),
  translate('noiseTolerance_statement13'),
  translate('noiseTolerance_statement14')
]

const generateIdForInput = (i: number) => `noise-tolerance-${i}`

export const handleNoiseToleranceForm = (translate: TFunction) => {
  updateStore({
    noiseTolerance: {
      soundsDislike: elements.noiseToleranceSoundsDislike().value,
      statementsScores: statements(translate).map(
        (_, i) => elements.noiseToleranceSliderN(i + 1).value
      )
    }
  })
}

const generateNoiseToleranceInputsHTML = (translate: TFunction) => (
  statement: string,
  id: string
): string =>
  `<div class="ui row">
  <div class="column no-left-padding no-right-padding">
    <div class="field">
      <label>${statement}</label>
    </div>
  </div>
</div>
<div class="ui row noise-tolerance-row">
  <div class="three wide left aligned column no-left-padding">
    <div class="small-text">${translate(
      'noiseTolerance_completelyDisagree'
    )}</div>
  </div>
  <div class="three wide center aligned column">
    <div class="small-text">${translate('noiseTolerance_disagree')}</div>
  </div>
  <div class="four wide center aligned column">
    <div class="small-text">${translate('noiseTolerance_neutral')}</div>
  </div>
  <div class="three wide center aligned column">
    <div class="small-text">${translate('noiseTolerance_agree')}</div>
  </div>
  <div class="three wide right aligned column no-right-padding">
    <div class="small-text">${translate('noiseTolerance_completelyAgree')}</div>
  </div>
</div>
<div class="ui row" style="padding-top: 0;">
  <div class="column">
    <input id="${id}" name="${id}" class="full-width" type="range" min="1" max="5" step="1" value="3">
  </div>
</div>`

export const load = (translate: TFunction) => {
  window.scroll(0, 0)

  const noiseToleranceFormGridElement = elements
    .noiseToleranceFormElement()
    ?.querySelector('.grid')
  if (isDefined(noiseToleranceFormGridElement)) {
    noiseToleranceFormGridElement.innerHTML =
      statements(translate)
        .map((statement, i) =>
          generateNoiseToleranceInputsHTML(translate)(
            statement,
            generateIdForInput(i + 1)
          )
        )
        .join('\n') +
      '\n' +
      noiseToleranceFormGridElement.innerHTML
  }
}

export const unload = () => {}
