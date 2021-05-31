import fs from "fs";
import * as childProcess from "child_process";
import { Logger } from "winston";
import { IllegalParameterError } from "../../errors/illegalParameterError";
import { injectable, inject } from "inversify";
import { TYPES } from "../../injection/types";
import { AWSS3Gateway } from "../../domain/gateways/awsS3Gateway";

const { exec } = childProcess;
// exec is a method that helps us execute terminal command line with NodeJS.
export interface AWSUtils {
  syncDirPathToS3(dirPath: string, bucket: string, logger: Logger): void;
  syncS3ToDirPath(dirPath: string, bucket: string, logger: Logger): void;
}

@injectable()
export class AWSUtilsImpl implements AWSUtils {
  constructor(
    @inject(TYPES.AWSS3Gateway)
    private awsS3Gateway: AWSS3Gateway
  ) {}

  public syncDirPathToS3(
    dirPath: string,
    bucket: string,
    logger: Logger
  ): void {
    fs.watch(dirPath, (event: string) => {
      console.log("event ", event);
      if (event == "change") {
        this.syncFiles(dirPath, bucket, logger, false);
      }
      if (event == "rename") {
        exec(`aws s3 sync ${dirPath} s3://${bucket} --delete`, (error) => {
          if (error) {
            logger.error("sync file from local directory to S3 Error: ", error);
            throw new IllegalParameterError(
              "",
              "syncDirPathToS3",
              "Sync File Error"
            );
          }
        });
        logger.info("Sync file from local directory to S3 Success !");
      }
    });
  }

  public syncS3ToDirPath(
    dirPath: string,
    bucket: string,
    logger: Logger
  ): void {
    this.syncFiles(dirPath, bucket, logger, true);

  }

  private syncFiles(
    dirPath: string,
    bucket: string,
    logger: Logger,
    isS3ToDirPath: boolean
  ): void {
    const execCommand = isS3ToDirPath
      ? `aws s3 sync s3://${bucket} ${dirPath}`
      : `aws s3 sync ${dirPath} s3://${bucket}`;
    const loggerMessage = isS3ToDirPath
      ? "Sync file from S3 to local directory Success !"
      : "Sync file from local directory to S3 Success !";

    exec(execCommand, (error) => {
      if (error) {
        logger.error("Sync File Error: ", error);
        throw new IllegalParameterError("", "syncFiles", "Sync File Error");
      }
    });

    logger.info(loggerMessage);
  }
}
