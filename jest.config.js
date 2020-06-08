module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '\\.(wav|mp3)$': './staticFileTransformer.js'
  }
}
