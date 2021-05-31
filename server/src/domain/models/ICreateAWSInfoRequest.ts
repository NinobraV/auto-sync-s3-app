import { AWSConfig } from "../../configs/appConfig";

export interface CreateAWSS3InfoRequest {
  awsCredential: AWSConfig,
  bucket: string,
  dirPath: string,
}
