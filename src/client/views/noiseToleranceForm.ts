import { Part } from '../models/part'
import { updateStore } from '../models/store'
import { isDefined } from '../utils'

export const id = `${Part.NoiseToleranceForm}-section`

export const section = document.getElementById(id)

const elements = {
  noiseToleranceFormElement: document.querySelector(
    'form#noise-tolerance-form'
  ) as HTMLFormElement,
  noiseToleranceSoundsDislike: document.querySelector(
    'input[name="noise-tolerance_sounds-dislike"]:checked'
  ) as HTMLInputElement,
  noiseToleranceSliderN: (n: number) =>
    document.querySelector(
      `input[name="${generateIdForInput(n)}"]`
    ) as HTMLInputElement
}

const statements = [
  `Certains sons me dérangent tellement que j’ai du mal à contrôler mes émotions.`,
  `Les sons déplaisants me donnent l’impression d’être submergé(e).`,
  `Je deviens anxieux à la simple pensée d’un son désagréable.`,
  `Je crois que mes réactions aux sons sont exagérées, mais je ne peux pas m’en défaire.`,
  `Lorsque j’entends des sons déplaisants, je commence à sentir des émotions dans mon corps (par
exemple : je transpire, je ressens de la douleur, de la pression, mes muscles se tendent).`,
  `Je commence à ressentir de la colère dès que je vois un objet/animal/personne qui pourrait
produire un son désagréable.`,
  `Je fais beaucoup d'efforts pour contrôler mes émotions lorsque j'entends un son désagréable.`,
  `Si je le peux, j'évite de rencontrer certaines personnes à cause des bruits qu'elles produisent.`,
  `Je trouve certains sons produits par le corps humain insupportables.`,
  `Je sens que mon état mental s'aggrave si je ne peux pas quitter un endroit où il y a un son
désagréable.`,
  `Je réfléchis souvent à des techniques pour masquer ou noyer les sons désagréables.`,
  `Certains sons désagréables me mettent immédiatement en colère.`,
  `Je crains que les sons désagréables puissent avoir un impact sur mon avenir.`,
  `Lorsque je rencontre d'autres personnes, je suis parfois irrité par la présence de sons
désagréables.`
]

const generateIdForInput = (i: number) => `noise-tolerance-${i}`

export const handleNoiseToleranceForm = () => {
  updateStore({
    noiseTolerance: {
      soundsDislike: elements.noiseToleranceSoundsDislike.value,
      statementsScores: statements.map(
        (_, i) => elements.noiseToleranceSliderN(i + 1).value
      )
    }
  })
}

const generateNoiseToleranceInputsHTML = (
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
    <div class="small-text">Je ne suis pas du tout d’accord</div>
  </div>
  <div class="three wide center aligned column">
    <div class="small-text">Je ne suis pas d’accord</div>
  </div>
  <div class="four wide center aligned column">
    <div class="small-text">Ni d’accord ni pas d’accord</div>
  </div>
  <div class="three wide center aligned column">
    <div class="small-text">Je suis d’accord</div>
  </div>
  <div class="three wide right aligned column no-right-padding">
    <div class="small-text">Je suis tout à fait d’accord</div>
  </div>
</div>
<div class="ui row" style="padding-top: 0;">
  <div class="column">
    <input id="${id}" name="${id}" class="full-width" type="range" min="1" max="5" step="1" value="3">
  </div>
</div>`

export const load = () => {
  const noiseToleranceFormGridElement = elements.noiseToleranceFormElement?.querySelector(
    '.grid'
  )
  if (isDefined(noiseToleranceFormGridElement)) {
    noiseToleranceFormGridElement.innerHTML =
      statements
        .map((statement, i) =>
          generateNoiseToleranceInputsHTML(statement, generateIdForInput(i + 1))
        )
        .join('\n') +
      '\n' +
      noiseToleranceFormGridElement.innerHTML
  }
}

export const unload = () => {}
