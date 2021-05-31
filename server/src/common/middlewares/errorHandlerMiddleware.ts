import { Next, Context } from "koa";
import { HttpBaseError } from "../../errors/httpBaseError";
import { Logger } from "winston";
import { SystemMessage } from "../systemMessage";

export default function errorHandlerMiddleWare(logger: Logger): ((context: Context, next: Next) => Promise<any>) {
  return async (context: Context, next: Next): Promise<any> => {
    try {
      await next();
    }
    catch (error) {
      logger.error(error.message, error);
      if(error instanceof HttpBaseError) {
        context.status = error.code;
        context.body = buildErrorBody(error.code, error.message)
        return;
      }

      context.status = 500;
      context.body = buildErrorBody(500, SystemMessage.SYSTEM_ERROR);
    }
  }
}

function buildErrorBody(errorCode: number, errorMessage: string): ErrorResponse {
  return {
    status: errorCode,
    message: errorMessage
  }
}

interface ErrorResponse {
  status: number;
  message: string;
}