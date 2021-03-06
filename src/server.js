const { createProxyMiddleware } = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

const bundler = new Bundler(
  ['src/client/index.html', 'src/client/reset.html'],
  {
    cache: false
  }
)

const app = express()

app.use(
  '/.netlify/functions',
  createProxyMiddleware({
    target: 'http://localhost:9000',
    pathRewrite: {
      '^/.netlify/functions': ''
    }
  })
)

app.use(bundler.middleware())

app.get('/', (req, res) => res.redirect('/index.html'))

app.get('/reset', (req, res) => res.redirect('/reset.html'))

app.listen(Number(process.env.PORT || 1234))
