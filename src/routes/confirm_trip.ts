import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { prisma } from "../lib/prisma";
import { dayjs } from '../lib/dayjs'
import { getMailClient } from "../lib/mail";
import nodemailer from 'nodemailer'
import { ClientError } from "../errors/client-error";
import { env } from "../env";



export async function  ConfirmTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm', {
        schema: {
          params: z.object({
            tripId: z.string().uuid()
          })
        }
    }, async (req, reply) => {
      
        const {tripId} = req.params

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            },
            include: {
                participants: {
                    where: {
                        is_owner: false
                    }
                }
            }
        })

        if (!trip) {
            throw new ClientError('Trip not found')

        }

        if (trip.is_confirmed){
            return reply.redirect(`${env.WEB_BASE_URL}/trips/${trip.id}`)
        }

        await prisma.trip.update({
            where: {id: trip.id},
            data: {is_confirmed: true},
        })



        const formatStartDay = dayjs(trip.starts_at).format('LL')
        const formatEndDay = dayjs(trip.ends_at).format('LL')

        
        const mail = await getMailClient()
        
        await Promise.all(
            trip.participants.map(async (participants) =>{
                const mail = await getMailClient()
                const confirmationLink = `${env.API_BASE_URL}/participants/${trip.id}/confirm`

        const message = await mail.sendMail({
            from: {
                name: "equipe Plann.er",
                address: "williansanchessavoia@gmail.com"
            },
            to: participants.email,
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
            }),
        )


        return reply.redirect(`${env.WEB_BASE_URL}/trips/${trip.id}`)
    }
)
}