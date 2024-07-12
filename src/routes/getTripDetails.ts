import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { dayjs } from '../lib/dayjs'
import { ClientError } from '../errors/client-error'

export async function getTripDetails(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
      '/trips/:tripId',
      {
        schema: {
          params: z.object({
            tripId: z.string().uuid(),
          })
        },
      },
    
      async (req) => {
          const { tripId} = req.params
  
          const trip = await prisma.trip.findUnique({
                where: { id: tripId },
                select: {
                    id: true,
                    destination: true,
                    starts_at: true,
                    ends_at: true

                }
          })
  
          if (!trip) {
              throw new ClientError('Trips not found')
      }
  
      
      return { trip }
  }
    )
}