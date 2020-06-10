import { noop } from '../utils'

export const id = 'part-5'

export const section = document.getElementById(id)

const elements = {
  progressBar: document.getElementById('end-experiment-progress-bar'),
  dataAutoSentMessage: document.getElementById('data-auto-sent-message')
}

export const load = () => {
  $(`#${elements.progressBar!.id}`)
    .progress('set duration', 1)
    .progress('complete')
}

export const unload = noop
