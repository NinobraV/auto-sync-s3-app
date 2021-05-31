import { inject, injectable } from "inversify";
import { IMiddleware } from "koa-router";
import { Context } from "koa";
// import { UnauthorizedError } from "src/errors/unauthorizedError";

@injectable()

export abstract class Router {


  protected static buildSuccessBody<T>(data: T): SuccessResponse<T> {
    return { data };
  }

  public abstract routes(): IMiddleware;

  protected handlePublicRoute(handler: (context: Context) => Promise<any> ): (context: Context) => Promise<any> {
    return async (context: Context): Promise<any> => {
      await handler(context);
    }
  }

}

interface SuccessResponse<T> {
  data: T;
}