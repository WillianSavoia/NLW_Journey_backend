import fastify from 'fastify';
import cors from '@fastify/cors';
import { prisma } from './lib/prisma';
import { createTrip } from './routes/create_trip';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { ConfirmTrip } from './routes/confirm_trip';
import { confirmParticipants } from './routes/confirm_participant';
import { createActivity } from './routes/createActivity';
import { createLinks } from './routes/createLinks';
import { getActivities } from './routes/getActivites';
import { getLinks } from './routes/getLinks';
import { getParticipants } from './routes/getPaticipants';
import { createInvite } from './routes/createInvite';
import { updateTrip } from './routes/updateTrip';
import { getTripDetails } from './routes/getTripDetails';
import { getParticipant } from './routes/get-participants';
import { errorHandler } from './error-handler';
import { env } from './env';


const app = fastify();

app.register(cors, {
    origin: '*'
})

app.setErrorHandler(errorHandler)

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip)
app.register(createInvite)
app.register(createActivity)
app.register(createLinks)

app.register(ConfirmTrip)
app.register(confirmParticipants)
app.register(updateTrip)

app.register(getActivities)
app.register(getLinks)
app.register(getParticipants)
app.register(getParticipant)
app.register(getTripDetails)

app.listen({ port: env.PORT}).then(() => {
    console.log('listening on port '); 
})