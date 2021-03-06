import joi from "joi";
import { ServerConfig } from "../appConfig";

const envVarsSchema = joi.object({
  SERVER_PORT: joi.number().required(),
  SERVER_LOG_PATH: joi.string().required(),
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if(error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const serverConfig: ServerConfig = {
  port: Number(envVars.SERVER_PORT),
  logPath: envVars.SERVER_LOG_PATH
}