import { Context } from 'aws-lambda'
import * as sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function handler(event: any, context: Context) {
  console.log('context', context)
  console.log('event', event)

  if (event.httpMethod === 'POST' && !!event.body) {
    if (process.env.SENDGRID_FROM_EMAIL && process.env.SENDGRID_TO_EMAIL) {
      sgMail
        .send({
          from: process.env.SENDGRID_FROM_EMAIL,
          to: process.env.SENDGRID_TO_EMAIL,
          subject: `Résultats de l'expérience sur l'audition en ligne`,
          text: event.body,
          html: `<strong>${event.body}</strong>`
        })
        .then(console.log, console.error)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello world ${Math.floor(Math.random() * 10)}`
    })
  }
}
