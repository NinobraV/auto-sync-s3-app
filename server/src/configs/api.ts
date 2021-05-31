import { ApiConfig } from "./appConfig";
import { serverConfig } from "./components/server";
import { awsConfig } from "./components/aws";

export const apiConfig: ApiConfig = new ApiConfig(
  serverConfig,
  awsConfig
);