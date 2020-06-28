import birds from '../sounds/Birds_1.wav'
import blowingNose from '../sounds/Blowing_nose1.wav'
import boire from '../sounds/Boire.wav'
import breathRunning from '../sounds/Breath_running.wav'
import clapping from '../sounds/Clapping_3.wav'
import clavier from '../sounds/Clavier.wav'
import cough from '../sounds/Cough.wav'
import distortedGuitarNeckDissonance from '../sounds/Distorted Guitar Neck Dissonance_1.wav'
import eat from '../sounds/Eat.wav'
import eat3 from '../sounds/Eat_3.wav'
import femaleScream from '../sounds/Female Scream_2.wav'
import fingernailsOnChalkboard from '../sounds/Fingernails On Chalkboard_2.wav'
import forkScratchPlate from '../sounds/Fork Scratch Plate_2.wav'
import garglingWater from '../sounds/Gargling-Water.wav'
import hardBreathing from '../sounds/Hard-Breathing.wav'
import harp from '../sounds/Harp_1.wav'
import knifeHitGlass from '../sounds/Knife Hit Glass_1.wav'
import lake from '../sounds/Lake_2.wav'
import laugh from '../sounds/Laugh_1.wav'
import marimba from '../sounds/Marimba_1.wav'
import penClick from '../sounds/Pen-Click.wav'
import sniffing from '../sounds/Sniffing.wav'
import snoringSleepApnea from '../sounds/Snoring_sleepApnea.wav'
import squeakingDoor from '../sounds/Squeaking Door_3.wav'
import swallowing from '../sounds/Swallowing.wav'
import throatClear from '../sounds/Throat_Clear.wav'
import vomit from '../sounds/Vomit.wav'
import wheezing from '../sounds/Wheezing.wav'
import whiteNoise from '../sounds/White Noise_1.wav'
import underwater from '../sounds/Underwater_1.wav'
import fountain from '../sounds/Fountain_1.wav'

import { head } from '../utils'

export const refSoundFilePath = whiteNoise

export const trainingSound = {
  pleasant: marimba,
  unpleasant: squeakingDoor
}

const audioFilePaths = [
  birds,
  blowingNose,
  boire,
  breathRunning,
  clapping,
  clavier,
  cough,
  distortedGuitarNeckDissonance,
  eat,
  eat3,
  femaleScream,
  fingernailsOnChalkboard,
  forkScratchPlate,
  garglingWater,
  hardBreathing,
  harp,
  knifeHitGlass,
  lake,
  laugh,
  penClick,
  sniffing,
  snoringSleepApnea,
  swallowing,
  throatClear,
  vomit,
  wheezing,
  underwater
  fountain
]

export const getFilePathFromName = (
  filePaths: string[],
  fileName: string
): string | undefined => {
  const [name, extension] = fileName.split('.')
  return head(
    filePaths.filter(_ =>
      new RegExp(`${name}\\.[^.]+\\.${extension}`, 'i').test(_)
    )
  )
}

export default audioFilePaths
