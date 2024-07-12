"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const create_trip_1 = require("./routes/create_trip");
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const confirm_trip_1 = require("./routes/confirm_trip");
const confirm_participant_1 = require("./routes/confirm_participant");
const createActivity_1 = require("./routes/createActivity");
const createLinks_1 = require("./routes/createLinks");
const getActivites_1 = require("./routes/getActivites");
const getLinks_1 = require("./routes/getLinks");
const getPaticipants_1 = require("./routes/getPaticipants");
const createInvite_1 = require("./routes/createInvite");
const updateTrip_1 = require("./routes/updateTrip");
const getTripDetails_1 = require("./routes/getTripDetails");
const get_participants_1 = require("./routes/get-participants");
const error_handler_1 = require("./error-handler");
const env_1 = require("./env");
const app = (0, fastify_1.default)();
app.register(cors_1.default, {
    origin: '*'
});
app.setErrorHandler(error_handler_1.errorHandler);
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
app.register(create_trip_1.createTrip);
app.register(createInvite_1.createInvite);
app.register(createActivity_1.createActivity);
app.register(createLinks_1.createLinks);
app.register(confirm_trip_1.ConfirmTrip);
app.register(confirm_participant_1.confirmParticipants);
app.register(updateTrip_1.updateTrip);
app.register(getActivites_1.getActivities);
app.register(getLinks_1.getLinks);
app.register(getPaticipants_1.getParticipants);
app.register(get_participants_1.getParticipant);
app.register(getTripDetails_1.getTripDetails);
app.listen({ port: env_1.env.PORT }).then(() => {
    console.log('listening on port ');
});
