import { Context } from 'aws-lambda'

export async function handler(event: any, context: Context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello world ${Math.floor(Math.random() * 10)}`
    })
  }
}
