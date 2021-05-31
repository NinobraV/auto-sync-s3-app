import joi from "joi";
import { AWSConfig } from "../appConfig";

const envVarsSchema = joi
  .object({
    ACCESS_KEY_ID: joi.string().required(),
    SECRET_ACCESS_KEY: joi.string().required(),
    REGION: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const awsConfig: AWSConfig = {
  accessKeyId: envVars.ACCESS_KEY_ID as string,
  secretAcessKey: envVars.SECRET_ACCESS_KEY as string,
  region: envVars.REGION as string,
};
