import { inject, injectable } from "inversify";
import KoaRouter, { IMiddleware } from "koa-router";
import { Router } from "../../../common/router";
import { TYPES } from "../../../injection/types";
import { CreateAWSS3InfoRequest } from "../../../domain/models/ICreateAWSInfoRequest";
import { CreateAWSS3InfoUseCase } from "../../../usecases/createAWSS3InfoUseCase";
import { AWSUtils } from "../../utils/awsUtils";
import { Logger } from "winston";

@injectable()
export class HomeRouter extends Router {
  private readonly router: KoaRouter

  constructor(
    @inject(TYPES.CreateAWSS3InfoUseCase)
    private readonly createAWSS3InfoUseCase: CreateAWSS3InfoUseCase,
    @inject(TYPES.Logger)
    private readonly logger: Logger,
    @inject(TYPES.AWSUtils)
    private readonly awsUtils: AWSUtils
  ) {
    super();
    this.router = new KoaRouter({
      prefix: "/home",
    });

    this.router.post(
      "syncDirPathToS3",
      "/sync-dirpath-s3",
      this.handlePublicRoute(async (ctx) => {
        const { dirPath, bucket } = ctx.request.body;
       this.awsUtils.syncDirPathToS3(dirPath, bucket, this.logger);
        ctx.status = 200;
      })
    );

    this.router.post(
      "syncS3ToDirPath",
      "/sync-s3-dirpath",
      this.handlePublicRoute(async (ctx) => {
        const { dirPath, bucket } = ctx.request.body;
        this.awsUtils.syncS3ToDirPath(dirPath, bucket, this.logger);
        ctx.status = 200;
      })
    )

    this.router.post(  // API de user nhap info
      "createAWSInfo",
      "/aws-info",
      this.handlePublicRoute(async (ctx) => {
        const { awsCredential, bucket, dirPath } = ctx.request.body;

        const awsCredentialSession = ctx.session.awsCredential;
        const bucketSession = ctx.session.bucket;
        const dirPathSession = ctx.session.dirPath;

        const isChangeCredential = 
        awsCredentialSession && awsCredentialSession.accessKeyId == awsCredential.accessKeyId && awsCredentialSession.secretAccessKey == awsCredential.secretAccessKey
        && awsCredentialSession.region == awsCredential.region ? false : true;

        if(!awsCredentialSession || isChangeCredential) {
          ctx.session.awsCredential = awsCredential;
        }
        if(!bucketSession || bucketSession && bucketSession != bucket) {
          ctx.session.bucket = bucket;
        }
        if(!dirPathSession || dirPathSession && dirPathSession != dirPath) {
          ctx.session.dirPath = dirPath;
        }

       const createAWSInfoRequest: CreateAWSS3InfoRequest = {
        awsCredential: ctx.session.awsCredential,
        bucket: ctx.session.bucket,
        dirPath: ctx.session.dirPath
       };

       const response = await this.createAWSS3InfoUseCase.execute(createAWSInfoRequest);
       ctx.body = Router.buildSuccessBody(response);
       ctx.status = 200;
      })
    );

    this.router.get(
      "clearSessionData",
      "/clear-session",
      this.handlePublicRoute(async (ctx) => {
        ctx.session = null;
        ctx.status = 200;
      })
    );

  }

  public routes(): IMiddleware {
    return this.router.routes();
  }
}