import { getStore, Store } from './store'

export const createResults = ({
  userInfo,
  soundVolume,
  soundTests
}: Store) => ({ userInfo, soundVolume, soundTests })

export const sendData = () =>
  window
    .fetch('/.netlify/functions/hello', {
      method: 'POST',
      body: JSON.stringify(createResults(getStore()))
    })
    .then(console.log, console.error)
