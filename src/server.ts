import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { checkIn } from "./routes/check-in";
import { createEvent } from "./routes/create-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { getEvent } from "./routes/get-event";
import { getEventAttendees } from "./routes/get-event-attendees";
import { registerForEvent } from "./routes/register-for-events";
import { errorHandler } from "./error-handler";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Documentção da minha API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);

app.setErrorHandler(errorHandler);

app
  .listen({ port: 3333, host: "0.0.0.0" })
  .then(() => console.log("Server Running"));
