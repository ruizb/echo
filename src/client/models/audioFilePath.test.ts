import { getFilePathFromName } from './audioFilePath'

describe('getFilePathFromName', () => {
  const filePaths = ['/path/to/sound1.abc123.wav', '/path/to/sound2.abc123.wav']

  it('should find the file path from the file name', () => {
    expect(getFilePathFromName(filePaths, 'sound1.wav')).toBe(
      '/path/to/sound1.abc123.wav'
    )
  })

  it('should return undefined if file name does not match any file path', () => {
    expect(getFilePathFromName(filePaths, 'sound3.wav')).toBeUndefined()
  })
})
