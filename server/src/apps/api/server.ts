import { Container } from "inversify";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import errorHandlerMiddleware from "../../common/middlewares/errorHandlerMiddleware";
import { TYPES } from "../../injection/types";
import { ServerConfig } from "../../configs/appConfig";

import http from "http";
import Koa from "koa";
import { Router } from "../../common/router";
import { Logger } from "winston";
import session from "koa-session"
import { SESSION_CONFIG } from "../../configs/sessionConfig";

export class Server {
  private readonly app: Koa;
  private readonly serverConfig: ServerConfig
  private readonly logger: Logger


  constructor(appContainer: Container) {
    this.logger = appContainer.get<Logger>(TYPES.Logger);
    this.serverConfig = appContainer.get<ServerConfig>(TYPES.ServerConfig);
    const homeRouter = appContainer.get<Router>(TYPES.HomeRouter);
    
    this.app = new Koa();
    this.app.keys = ['newest secret key', 'older secret key'];
    this.app.use(cors());
    this.app.use(bodyParser());
    this.app.use(errorHandlerMiddleware(this.logger));
    this.app.use(session(SESSION_CONFIG, this.app))
    this.app.use(homeRouter.routes());

  }  

  public start(): http.Server {
    return this.app.listen(this.serverConfig.port, () => {
      this.logger.info(`Server is listening on port ${this.serverConfig.port}`);
    })
  }

}