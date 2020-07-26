import mustache from 'mustache'
import i18next from 'i18next'
import languageDetector from 'i18next-browser-languagedetector'
import { Part } from './models/part'
import { createSoundTests } from './models/soundTest'
import { getStore, initialStore, updateStore } from './models/store'
import {
  adaptMainContainerPosition,
  isDefined,
  noop,
  sectionTransition
} from './utils'
import * as introduction from './views/introduction'
import { handleNoiseToleranceForm } from './views/noiseToleranceForm'
import * as soundConfig from './views/soundConfig'
import { handleUserInfoForm } from './views/userInfoForm'
import * as userInfoForm from './views/userInfoForm'
import * as noiseToleranceForm from './views/noiseToleranceForm'
import * as soundTests from './views/soundTests'
import * as soundTraining from './views/soundTraining'
import * as end from './views/end'
import frTranslations from './i18n/fr'
import enTranslations from './i18n/en'

const resetExperiment = (): void => {
  updateStore(initialStore)
  location.reload()
}

i18next
  .use(languageDetector)
  .init({
    fallbackLng: 'en',
    nsSeparator: false,
    keySeparator: false,
    resources: {
      fr: {
        translation: frTranslations
      },
      en: {
        translation: enTranslations
      }
    }
  })
  .then(t => {
    const getSectionAndLoad = (
      part: Part
    ): [HTMLElement | null, () => void, () => void] => {
      switch (part) {
        case Part.Introduction:
          return [
            introduction.section(),
            introduction.load,
            introduction.unload
          ]
        case Part.UserInfoForm:
          return [
            userInfoForm.section(),
            userInfoForm.load,
            userInfoForm.unload
          ]
        case Part.NoiseToleranceForm:
          return [
            noiseToleranceForm.section(),
            () => noiseToleranceForm.load(t),
            noiseToleranceForm.unload
          ]
        case Part.SoundConfig:
          return [
            soundConfig.section(),
            () => soundConfig.load(t),
            soundConfig.unload
          ]
        case Part.SoundTraining:
          return [
            soundTraining.section(),
            () => soundTraining.load(t),
            soundTraining.unload
          ]
        case Part.SoundTests:
          return [
            soundTests.section(),
            soundTests.load(resetExperiment, t),
            soundTests.unload
          ]
        case Part.End:
          return [end.section(), end.load, end.unload]
        default:
          return [null, noop, noop]
      }
    }

    // prevent HTML entities from being escaped by Mustache
    mustache.escape = txt => txt

    // replace {{x}} parts of the document with the appropriate translated text
    document.body.innerHTML = mustache.render(
      document.body.innerHTML,
      Object.keys(frTranslations).reduce(
        (acc, k) => ({ ...acc, [k]: t(k) }),
        {}
      )
    )

    const [section, load] = getSectionAndLoad(getStore().partInProgress)

    section?.classList.remove('hide')
    load()

    adaptMainContainerPosition()

    document
      .getElementById('start-experiment')
      ?.addEventListener('click', () => {
        updateStore({ partInProgress: Part.UserInfoForm })

        sectionTransition({
          from: introduction,
          to: userInfoForm,
          onComplete: () => {
            introduction.unload()
            userInfoForm.load()
          }
        })
      })

    document
      .getElementById('user-info-form')
      ?.addEventListener('submit', evt => {
        evt.preventDefault()

        updateStore({ partInProgress: Part.NoiseToleranceForm })

        sectionTransition({
          from: userInfoForm,
          to: noiseToleranceForm,
          onComplete: () => {
            handleUserInfoForm()
            userInfoForm.unload()
            noiseToleranceForm.load(t)
            adaptMainContainerPosition()
          }
        })
      })

    document
      .getElementById('noise-tolerance-form')
      ?.addEventListener('submit', evt => {
        evt.preventDefault()

        updateStore({ partInProgress: Part.SoundConfig })

        sectionTransition({
          from: noiseToleranceForm,
          to: soundConfig,
          onComplete: () => {
            handleNoiseToleranceForm(t)
            noiseToleranceForm.unload()
            soundConfig.load(t)
            adaptMainContainerPosition()
          }
        })
      })

    document.getElementById('start-training')?.addEventListener('click', () => {
      const refSoundSlider = document.getElementById(
        'ref-sound-slider'
      ) as HTMLInputElement | null

      updateStore({
        partInProgress: Part.SoundTraining,
        soundVolume: isDefined(refSoundSlider)
          ? parseInt(refSoundSlider.value, 10) / 100
          : 0.1
      })

      sectionTransition({
        from: soundConfig,
        to: soundTraining,
        onComplete: () => {
          soundConfig.unload()
          soundTraining.load(t)
          adaptMainContainerPosition()
        }
      })
    })

    document
      .getElementById('reconfigure-sound')
      ?.addEventListener('click', () => {
        sectionTransition({
          from: soundTraining,
          to: soundConfig,
          direction: 'backward',
          onComplete: () => {
            soundTraining.unload()
            soundConfig.load(t)
            adaptMainContainerPosition()
          }
        })
      })

    document.getElementById('start-tests')?.addEventListener('click', () => {
      updateStore({
        partInProgress: Part.SoundTests
      })

      if (getStore().remainingSoundTests.length === 0) {
        updateStore({
          remainingSoundTests: createSoundTests().map(({ name, score }) => ({
            name,
            score
          }))
        })
      }

      sectionTransition({
        from: soundTraining,
        to: soundTests,
        onComplete: () => {
          soundTraining.unload()
          soundTests.load(resetExperiment, t)()
          adaptMainContainerPosition()
        }
      })
    })

    document.getElementById('end-experiment')?.addEventListener('click', () => {
      updateStore({
        partInProgress: Part.End
      })

      sectionTransition({
        from: soundTests,
        to: end,
        onComplete: () => {
          soundTests.unload()
          end.load()
          adaptMainContainerPosition()
        }
      })
    })
  })
  .catch(err => {
    console.error(`Error while initializing i18next`, err)
  })
