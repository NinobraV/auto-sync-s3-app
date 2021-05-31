import { Container } from "inversify";
import "reflect-metadata";
// import { WinstonLogger, Logger } from "@utils/logger";
import { TYPES } from "./types";
import { apiConfig } from "../configs/api";
import {  AWSConfig, ServerConfig,
} from "../configs/appConfig";
import { HomeRouter } from "../apps/api/home/homeRouter";
import { AWSProvider, AWSProviderImpl } from "../utils/awsProvider";
import {
  AWSS3Gateway,
  AWSS3GatewayImpl,
} from "../domain/gateways/awsS3Gateway";
import { Router } from "../common/router";
import { CreateAWSS3InfoUseCaseImpl, CreateAWSS3InfoUseCase } from "../usecases/createAWSS3InfoUseCase";
import { Logger, WinstonLogger } from "../apps/utils/logger";
import { AWSUtils, AWSUtilsImpl } from "../apps/utils/awsUtils";

export class AppContainer extends Container {
  public inject() {
    //Logger
    this.provideLogger();

    // Config Env, Server, Database, Redis, AWS,....
    this.provideServerConfig();
    this.provideAWSConfig();

    this.provideAWSProvider();
    this.provideAWSUtils();

    // Router
    this.provideHomeRouter();

    this.provideAWSS3Gateway();

    this.provideCreateAWSS3InfoUseCase();
  }

  protected provideLogger() {
    this.bind<Logger>(TYPES.Logger).to(WinstonLogger).inRequestScope();
  }

  protected provideServerConfig() {
    this.bind<ServerConfig>(TYPES.ServerConfig).toConstantValue(
      apiConfig.serverConfig
    );
  }

  protected provideAWSConfig() {
    this.bind<AWSConfig>(TYPES.AWSConfig).toConstantValue(apiConfig.awsConfig);
  }

  protected provideAWSProvider() {
    this.bind<AWSProvider>(TYPES.AWSProvider)
      .to(AWSProviderImpl)
      .inSingletonScope();
  }

  protected provideAWSS3Gateway() {
    this.bind<AWSS3Gateway>(TYPES.AWSS3Gateway)
      .to(AWSS3GatewayImpl)
      .inSingletonScope();
  }


  // Home Router

  protected provideHomeRouter() {
    this.bind<Router>(TYPES.HomeRouter).to(HomeRouter).inSingletonScope();
  }

  protected provideCreateAWSS3InfoUseCase() {
    this.bind<CreateAWSS3InfoUseCase>(TYPES.CreateAWSS3InfoUseCase).to(CreateAWSS3InfoUseCaseImpl).inSingletonScope();
  }

  protected provideAWSUtils() {
    this.bind<AWSUtils>(TYPES.AWSUtils).to(AWSUtilsImpl).inSingletonScope();
  }

}