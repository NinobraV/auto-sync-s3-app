import { inject, injectable } from "inversify";
import { AWSS3Gateway } from "../domain/gateways/awsS3Gateway";
import { AWSProvider } from "../utils/awsProvider";
import { TYPES } from "../injection/types";
import { CreateAWSS3InfoRequest } from "../domain/models/ICreateAWSInfoRequest";
import { Logger } from "winston";
import { Constant } from "../common/middlewares/constant";
import { AWSUtils } from "../apps/utils/awsUtils";

export interface CreateAWSS3InfoUseCase {
  execute(request: CreateAWSS3InfoRequest): Promise<{message: string}>;
}

@injectable()
export class CreateAWSS3InfoUseCaseImpl implements CreateAWSS3InfoUseCase {
  constructor(
    @inject(TYPES.AWSProvider)
    private readonly awsProvider: AWSProvider,
    @inject(TYPES.AWSS3Gateway)
    private readonly awsS3Gateway: AWSS3Gateway,
    @inject(TYPES.Logger)
    private readonly logger: Logger,
    @inject(TYPES.AWSUtils)
    private readonly awsUtils: AWSUtils
  ) { }

  public async execute(request: CreateAWSS3InfoRequest): Promise<{message: string}> {
    
    this.awsProvider.createAWSCredential(request.awsCredential);

    const isBucketExist = await this.awsS3Gateway.checkBucketExist(request.bucket);

    if(!isBucketExist) {
      await this.awsS3Gateway.createS3Bucket(request.bucket);
    }

    this.awsUtils.syncS3ToDirPath(request.dirPath, request.bucket, this.logger);

    return {
      message: Constant.CREDENTIAL_MESSAGE_SUCCESS,
    }
  }
}
