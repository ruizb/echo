import { Handler } from 'aws-lambda'

const handler: Handler = async (event, context) => ({
  statusCode: 200,
  body: 'Hello, World'
})

exports.handler = handler
