// tslint:disable:ordered-imports

import * as reflect from "reflect-metadata";

import { AppContainer } from "../../injection/appContainer";
import { Server } from "../../apps/api/server";

process.on("uncaughtException", function (error) {
  console.error(
    new Date().toUTCString() + " uncaughtException: ",
    error.message
  );
  console.error(error.stack);
  process.exit(1);
});

const appContainer = new AppContainer();
appContainer.inject();
const server = new Server(appContainer);

server.start();
