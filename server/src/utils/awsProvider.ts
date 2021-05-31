import { inject, injectable } from "inversify";
import AWS from "aws-sdk";
import { TYPES } from "../injection/types";
import { AWSConfig } from "../configs/appConfig";
import { S3Client } from "@aws-sdk/client-s3";

export interface AWSProvider {
  S3(): AWS.S3;
  S3Client(): S3Client;
  createAWSCredential(credential: AWSConfig): void;
}

@injectable()
export class AWSProviderImpl implements AWSProvider {
  constructor(
    @inject(TYPES.AWSConfig)
    private readonly awsConfig: AWSConfig
  ) {}

  public createAWSCredential(credential: AWSConfig): void {
    AWS.config.update({
      accessKeyId: credential.accessKeyId,
      secretAccessKey: credential.secretAcessKey,
      region: credential.region,
    });
  }

  public S3(): AWS.S3 {
    return new AWS.S3({
      apiVersion: "2006-03-01",
      region: this.awsConfig.region,
    });
  }

  public S3Client(): S3Client {
    return new S3Client({
      region: this.awsConfig.region
    })
  }
}
