import * as joi from "joi";
import 'dotenv/config'

interface envVars{
    PORT: number;
    NATS_SERVERS: string;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required()

})
.unknown(true)

const {error, value} = envSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

if(error){
    throw new Error(error.details[0].message);
}

const vars: envVars = value;

export const envs = {
    port: vars.PORT,
    nats_servers: vars.NATS_SERVERS
}

