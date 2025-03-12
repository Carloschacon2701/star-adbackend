// aws.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsConfig {
  constructor(private configService: ConfigService) {}

  get region(): string {
    return this.configService.get<string>('AWS_REGION') ?? 'us-east-1';
  }

  get credentials() {
    return {
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') ?? '',
      secretAccessKey:
        this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ?? '',
    };
  }

  get cognitoUserPoolId(): string {
    return this.configService.get<string>('COGNITO_USER_POOL_ID') ?? '';
  }

  get cognitoClientId(): string {
    return this.configService.get<string>('COGNITO_CLIENT_ID') ?? '';
  }
}
