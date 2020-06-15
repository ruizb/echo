import { Context } from 'aws-lambda'
import * as sgMail from '@sendgrid/mail'
import { ClientResponse } from '@sendgrid/client/src/response'
import transformResultsToCsv from './helpers/transformResultsToCsv'
import { generateRandomString } from './helpers/utils'

const {
  SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL,
  SENDGRID_FROM_NAME,
  SENDGRID_TO_EMAIL
} = process.env

const sendEmail = (
  client: typeof sgMail,
  data: Parameters<typeof sgMail.send>[0]
): Promise<ClientResponse> =>
  new Promise((resolve, reject) => {
    console.log('Sending the email...')
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
    try {
      const results = JSON.parse(event.body)
      const res = await sendEmail(sgMail, [
        {
          from: { name: SENDGRID_FROM_NAME!, email: SENDGRID_FROM_EMAIL! },
          to: SENDGRID_TO_EMAIL!,
          subject: `Résultats de l'expérience sur l'audition en ligne`,
          text: 'Résultats en pièce-jointe au format CSV.',
          html: `Résultats en pièce-jointe au format <strong>CSV</strong>.`,
          attachments: [
            {
              content: new Buffer(transformResultsToCsv(results)).toString(
                'base64'
              ),
              filename: `online-hearing-exp-results_${Date.now()}_${generateRandomString(
                5
              )}.csv`,
              type: 'text/csv',
              disposition: 'attachment'
            }
          ]
        }
      ])
      console.log(res)
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `Results successfully collected!`
        })
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Results could not be collected.`,
          err: err.message
        })
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Nothing special happened.`
    })
  }
}
