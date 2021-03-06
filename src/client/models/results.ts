import { getStore, Store } from './store'

export const createResults = ({
  userInfo,
  noiseTolerance,
  soundVolume,
  soundTests
}: Store) => ({ userInfo, noiseTolerance, soundVolume, soundTests })

export const sendData = () =>
  window
    .fetch('/.netlify/functions/collect-results', {
      method: 'POST',
      body: JSON.stringify(createResults(getStore()))
    })
    .then(
      res => {
        console.log(res)
        if (res.status >= 400) {
          throw res
        }
        return res
      },
      err => {
        console.error(err)
        throw err
      }
    )
