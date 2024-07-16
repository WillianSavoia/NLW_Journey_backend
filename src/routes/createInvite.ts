import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { dayjs } from '../lib/dayjs'
import nodemailer from 'nodemailer'
import { getMailClient } from '../lib/mail'
import { ClientError } from '../errors/client-error'
import { env } from '../env'
//import { ClientError } from '../errors/client-error'

export async function createInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/invites',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          email: z.string().email(),
          name: z.string()
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params
      const { email, name } = request.body

      const trip = await prisma.trip.findUnique({
        where: { id: tripId }
      })

      if (!trip) {
        throw new ClientError('Trip not found')
      }

        const participant = await prisma.participant.create({
            data: {
                name,
                email,
                trip_id: tripId
            }
        })

        
        const formatStartDay = dayjs(trip.starts_at).format('LL')
        const formatEndDay = dayjs(trip.ends_at).format('LL')

        
        const mail = await getMailClient()
        
     
        const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`

        const message = await mail.sendMail({
            from: {
                name: "equipe Plann.er",
                address: "tesrt@gmail.com"
            },
            to: participant.email,
            subject: `Confirme sua viagem para ${trip.destination}em ${formatStartDay}`,
            html: `
            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
              <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}</strong> nas datas de <strong>${trip.starts_at}</strong> até <strong>${trip.ends_at}</strong>.</p>
              <p></p>
              <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
              <p></p>
              <p>
                <a href="${confirmationLink}">Confirmar viagem</a>
              </p>
              <p></p>
              <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
            </div>
          `.trim(),
        })

        console.log(nodemailer.getTestMessageUrl(message)) 
         

      return { participantId: participant.id }
    },
  )
}