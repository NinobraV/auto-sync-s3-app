import { injectable, inject } from "inversify";
import { TYPES } from "../../injection/types";
import { AWSProvider } from "../../utils/awsProvider";
import {
  CreateBucketCommand,
  S3Client,
  CreateBucketCommandOutput,
  ListObjectsV2Output,
} from "@aws-sdk/client-s3";
import { Logger } from "../../apps/utils/logger";
import { PromiseResult } from "aws-sdk/lib/request";
import { AWSError } from "aws-sdk";

export interface AWSS3Gateway {
  createS3Bucket(bucket: string): Promise<CreateBucketCommandOutput>;
  checkBucketExist(bucket: string): Promise<boolean>;
  getAllS3Objects(
    bucket: string
  ): Promise<PromiseResult<ListObjectsV2Output, AWSError>>;
}

@injectable()
export class AWSS3GatewayImpl implements AWSS3Gateway {
  private readonly s3Client: S3Client;
  constructor(
    @inject(TYPES.AWSProvider)
    private readonly awsProvider: AWSProvider,
    @inject(TYPES.Logger)
    private readonly logger: Logger
  ) {
    this.s3Client = awsProvider.S3Client();
  }

  public async createS3Bucket(
    bucket: string
  ): Promise<CreateBucketCommandOutput> {
    try {
      const data = await this.s3Client.send(
        new CreateBucketCommand({ Bucket: bucket })
      );
      this.logger.info("data", data);
      this.logger.info("Successfully created a bucket called ", data.Location);
      return data;
    } catch (error) {
      this.logger.error("error", error);
    }
  }

  public async checkBucketExist(bucket: string): Promise<boolean> {
    const options = {
      Bucket: bucket,
    };

    try {
      await this.awsProvider.S3().headBucket(options).promise();
      return true;
    } catch (error) {
      if (error.statusCode === 404) {
        return false;
      }
      throw error;
    }
  }

  public async getAllS3Objects(
    bucket: string
  ): Promise<PromiseResult<ListObjectsV2Output, AWSError>> {
    try {
      const data = await this.awsProvider
        .S3()
        .listObjectsV2({
          Bucket: bucket,
          MaxKeys: 2147483647, //Maximum objects that s3 can store
        })
        .promise();

      return data;
    } catch (error) {
      this.logger.error("get list object s3 error: ", error);
    }
  }
}
