import { Context } from 'aws-lambda'
import * as sgMail from '@sendgrid/mail'

const {
  SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL,
  SENDGRID_FROM_NAME,
  SENDGRID_TO_EMAIL
} = process.env

const sendEmail = (
  client: typeof sgMail,
  {
    senderEmail,
    senderName,
    receiverEmail,
    subject,
    message,
    htmlMessage
  }: {
    senderEmail: string
    receiverEmail: string
    subject: string
    message: string
    senderName: string
    htmlMessage: string
  }
) =>
  new Promise((resolve, reject) => {
    console.log('Sending the email...')

    const data = {
      from: { email: senderEmail, name: senderName },
      subject,
      to: receiverEmail,
      text: message,
      html: htmlMessage
    }

    client
      .send(data)
      .then(([response, body]) => {
        console.log('Successfully sent email', response)
        resolve(response)
      })
      .catch(err => {
        console.error('Could not send email', err)
        reject(err)
      })
  })

export async function handler(event: any, context: Context) {
  console.log('context', context)
  console.log('event', event)

  sgMail.setApiKey(SENDGRID_API_KEY!)

  if (event.httpMethod === 'POST' && !!event.body) {
    sendEmail(sgMail, {
      senderName: SENDGRID_FROM_NAME!,
      senderEmail: SENDGRID_FROM_EMAIL!,
      receiverEmail: SENDGRID_TO_EMAIL!,
      subject: `Résultats de l'expérience sur l'audition en ligne`,
      message: event.body,
      htmlMessage: `<strong>${event.body}</strong>`
    }).then(console.log, console.error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello world ${Math.floor(Math.random() * 10)}`
    })
  }
}
