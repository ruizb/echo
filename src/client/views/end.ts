import { createResults, sendData } from '../models/results'
import { getStore, updateStore } from '../models/store'
import { isDefined, noop } from '../utils'

export const id = 'part-5'

export const section = () => document.getElementById(id)

const elements = {
  progressBar: document.getElementById('end-experiment-progress-bar'),
  dataAutoSentMessage: document.getElementById('data-auto-sent-message'),
  dataAutoSentMessageError: document.getElementById(
    'data-auto-sent-message-error'
  ),
  dataAutoSentMessageErrorData: document.getElementById(
    'data-auto-sent-message-error-data'
  )
}

export const load = () => {
  $(`#${elements.progressBar!.id}`)
    .progress('set duration', 1)
    .progress('complete')

  if (!getStore().dataSent) {
    sendData().then(
      () => {
        updateStore({ dataSent: true })
        elements.dataAutoSentMessageError?.classList.add('hide')
        elements.dataAutoSentMessage?.classList.remove('hide')
      },
      () => {
        elements.dataAutoSentMessage?.classList.add('hide')

        if (isDefined(elements.dataAutoSentMessageErrorData)) {
          elements.dataAutoSentMessageError?.classList.remove('hide')
          elements.dataAutoSentMessageErrorData.innerText = JSON.stringify(
            createResults(getStore())
          )
        }
      }
    )
  }
}

export const unload = noop
