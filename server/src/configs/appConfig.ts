export class ApiConfig {
  private _serverConfig: ServerConfig | undefined = undefined;
  private _awsConfig: AWSConfig | undefined = undefined;

  constructor(
    serverConfig: ServerConfig,
    awsConfig: AWSConfig
  ) {
    this._serverConfig = serverConfig;
    this._awsConfig = awsConfig;
  }

  get serverConfig(): ServerConfig {
    if   (!this._serverConfig) {
      throw new Error("Server config wasn't set yet");
    }
    return this._serverConfig;
  }


  get awsConfig(): AWSConfig {
    if(!this._awsConfig) {
      throw new Error("Aws config wasn't set yet");
    }

    return this._awsConfig;
  }
}

export interface ServerConfig {
  readonly port: number;
  readonly logPath: string;
}


export interface AWSConfig {
  readonly accessKeyId: string;
  readonly secretAcessKey: string;
  readonly region: string; 
}