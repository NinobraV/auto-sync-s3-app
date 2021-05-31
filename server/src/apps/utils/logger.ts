
import { injectable }  from "inversify";
import { createLogger, format, Logger as LoggerInstance, LoggerOptions, transports } from "winston";
 

export interface Logger {
   debug(message: string, metaData?: any): void;
   verbose(message: string, metaData?: any): void;
   info(message: string, metaData?: any): void;
   warn(message: string, metaData?: any): void;
   error(message: string, metaData?: any): void;
}

@injectable()
export class WinstonLogger implements Logger {
  private instance: LoggerInstance;

  constructor() {

    let options: LoggerOptions;

        options = {
          level: "debug",
          format: format.simple(),
          transports: [new transports.Console()]
        };

    this.instance = createLogger(options);
  }

  public debug(message: string, metaData?: any): void { 
    this.instance.log("debug", message, metaData)
  }

  public verbose(message: string, metaData?: any): void { 
    this.instance.log("verbose", message, metaData)
  }

  public info(message: string, metaData?: any): void { 
    this.instance.log("info",`Logger: ${message}` , metaData)
  }

  public warn(message: string, metaData?: any): void { 
    this.instance.log("warn", message, metaData)
  }

  public error(message: string, metaData?: any): void { 
    this.instance.log("error", message, metaData)
  }
}